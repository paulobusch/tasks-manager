﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Tasks.Domain._Common.Dtos;
using Tasks.Domain._Common.Enums;
using Tasks.Domain.Projects.Dtos;
using Tasks.Domain.Projects.Dtos.Works;
using Tasks.Domain.Works.Dtos;
using Tasks.IntegrationTests._Common;
using Tasks.IntegrationTests._Common.Results;
using Tasks.UnitTests._Common.Random;
using Xunit;

namespace Tasks.IntegrationTests.Projects
{
    public class ProjectsControllerTests : BaseTest
    {
        public ProjectsControllerTests(TasksFixture fixture) : base(fixture, "/projects") { }

        [Fact]
        public async void GetProjectByIdTest()
        {
            var developer = EntitiesFactory.NewDeveloper().Save();
            var project = EntitiesFactory.NewProject(developerIds: new [] { developer.Id }).Save();

            var (status, result) = await Request.GetAsync<ResultTest<ProjectDetailDto>>(new Uri($"{Uri}/{project.Id}"));

            var projectResult = result.Data;
            Assert.Equal(Status.Success, status);
            Assert.Equal(project.Id, projectResult.Id);
            Assert.Equal(project.Title, projectResult.Title);
            Assert.Equal(project.Description, projectResult.Description);

            var developerModel = projectResult.Developers.Single();
            Assert.Equal(developer.Id, developerModel.Id);
            Assert.Equal(developer.Name, developerModel.Name);
        }

        [Fact]
        public async void ListProjectsTest()
        {
            var query = new PaginationDto { Page = 1, Limit = 1 };
            EntitiesFactory.NewProject().Save();
            EntitiesFactory.NewProject().Save();

            var (status, result) = await Request.GetAsync<ResultTest<IEnumerable<ProjectListDto>>>(Uri, query);

            var projectList = result.Data;
            Assert.Equal(Status.Success, status);
            Assert.NotEmpty(projectList);
            Assert.True(projectList.Count() == query.Limit);
        }

        [Fact]
        public async void CreateProjectTest()
        {
            var developer = EntitiesFactory.NewDeveloper().Save();
            var projectDto = new ProjectCreateDto
            {
                Id = Guid.NewGuid(),
                Title = RandomHelper.RandomString(),
                Description = RandomHelper.RandomString(490),
                DeveloperIds = new [] { developer.Id } 
            };

            var (status, result) = await Request.PostAsync<ResultTest>(Uri, projectDto);

            var projectDb = await DbContext.Projects
                .Include(p => p.DeveloperProjects)
                .SingleAsync(p => p.Id == projectDto.Id);
            Assert.Equal(Status.Success, status);
            Assert.True(result.Success);
            Assert.Equal(projectDto.Title, projectDb.Title);
            Assert.Equal(projectDto.Description, projectDb.Description);
            Assert.Single(projectDb.DeveloperProjects);
            Assert.Contains(projectDb.DeveloperProjects, d => d.DeveloperId == developer.Id);
        }

        [Fact]
        public async void UpdateProjectTest()
        {
            var developer = EntitiesFactory.NewDeveloper().Save();
            var project = EntitiesFactory.NewProject().Save();
            var projectDto = new ProjectUpdateDto
            {
                Id = project.Id,
                Title = RandomHelper.RandomString(),
                Description = RandomHelper.RandomString(490),
                DeveloperIds = new[] { developer.Id }
            };

            var (status, result) = await Request.PutAsync<ResultTest>(new Uri($"{Uri}/{project.Id}"), projectDto);

            var projectDb = await DbContext.Projects
                .Include(p => p.DeveloperProjects)
                .SingleAsync(p => p.Id == projectDto.Id);
            await DbContext.Entry(projectDb).ReloadAsync();
            Assert.Equal(Status.Success, status);
            Assert.True(result.Success);
            Assert.Equal(projectDto.Title, projectDb.Title);
            Assert.Equal(projectDto.Description, projectDb.Description);
            Assert.Single(projectDb.DeveloperProjects);
            Assert.Contains(projectDb.DeveloperProjects, d => d.DeveloperId == developer.Id);
        }

        [Fact]
        public async void DeleteProjectAsync()
        {
            var project = EntitiesFactory.NewProject().Save();

            var (status, result) = await Request.DeleteAsync<ResultTest>(new Uri($"{Uri}/{project.Id}"));

            var existProject = await DbContext.Projects.AnyAsync(d => d.Id == project.Id);
            Assert.Equal(Status.Success, status);
            Assert.True(result.Success);
            Assert.False(existProject);
        }

        [Theory]
        [InlineData(true)]
        [InlineData(false)]
        public async void ListWorkProjectAsync(bool withFilter)
        {
            var query = new ProjectWorkSearchClientDto { Page = 1, Limit = 1, DeveloperId = withFilter ? (Guid?)SessionDeveloper.Id : null };
            var project = EntitiesFactory.NewProject(developerIds: new[] { SessionDeveloper.Id }).Save();
            EntitiesFactory.NewWork(Guid.NewGuid(), project.DeveloperProjects.Single().Id).Save();
            EntitiesFactory.NewWork(Guid.NewGuid(), project.DeveloperProjects.Single().Id).Save();

            var (status, result) = await Request.GetAsync<ResultTest<IEnumerable<ProjectWorkListDto>>>(new Uri($"{Uri}/{project.Id}/works"), query);

            var workList = result.Data;
            Assert.Equal(Status.Success, status);
            Assert.NotEmpty(workList);
            Assert.True(workList.Count() == query.Limit);
            Assert.All(workList, work =>
            {
                Assert.True(work.Hours > 0);
                Assert.NotEmpty(work.Comment);
                Assert.NotNull(work.Developer);
                if (withFilter)
                {
                    Assert.Equal(SessionDeveloper.Id, work.Developer.Id);
                    Assert.Equal(SessionDeveloper.Name, work.Developer.Name);
                }
            });
        }

        [Fact]
        public async void CreateWorkProjectAsync()
        {
            var project = EntitiesFactory.NewProject(developerIds: new [] { SessionDeveloper.Id }).Save();
            var workDto = new WorkClientDto
            {
                Id = Guid.NewGuid(),
                StartTime = DateTime.Now.AddMinutes(-30),
                EndTime = DateTime.Now,
                Comment = RandomHelper.RandomString(100),
                Hours = 12
            };

            var (status, result) = await Request.PostAsync<ResultTest>(new Uri($"{Uri}/{project.Id}/works"), workDto);

            var workDb = await DbContext.Works
                .Include(w => w.DeveloperProject)
                .FirstAsync(w => w.Id == workDto.Id);
            Assert.Equal(Status.Success, status);
            Assert.NotNull(workDb.DeveloperProject);
            Assert.Equal(project.Id, workDb.DeveloperProject.ProjectId);
            Assert.Equal(SessionDeveloper.Id, workDb.DeveloperProject.DeveloperId);
            Assert.Equal(workDto.StartTime, workDb.StartTime, TimeSpan.FromSeconds(5));
            Assert.Equal(workDto.EndTime, workDb.EndTime, TimeSpan.FromSeconds(5));
            Assert.Equal(workDto.Comment, workDb.Comment);
            Assert.Equal(workDto.Hours, workDb.Hours);
        }

        [Fact]
        public async void UpdateWorkProjectAsync()
        {
            var project = EntitiesFactory.NewProject(developerIds: new[] { SessionDeveloper.Id }).Save();
            var work = EntitiesFactory.NewWork(Guid.NewGuid(), project.DeveloperProjects.Single().Id).Save();
            var workDto = new WorkClientDto
            {
                Id = work.Id,
                StartTime = DateTime.Now.AddHours(-3),
                EndTime = DateTime.Now.AddHours(-1),
                Comment = RandomHelper.RandomString(105),
                Hours = 30
            };

            var (status, result) = await Request.PutAsync<ResultTest>(new Uri($"{Uri}/{project.Id}/works/{work.Id}"), workDto);

            var workDb = await DbContext.Works
                .Include(w => w.DeveloperProject)
                .FirstAsync(w => w.Id == workDto.Id);
            await DbContext.Entry(workDb).ReloadAsync();
            Assert.Equal(Status.Success, status);
            Assert.NotNull(workDb.DeveloperProject);
            Assert.Equal(project.Id, workDb.DeveloperProject.ProjectId);
            Assert.Equal(SessionDeveloper.Id, workDb.DeveloperProject.DeveloperId);
            Assert.Equal(workDto.StartTime, workDb.StartTime, TimeSpan.FromSeconds(5));
            Assert.Equal(workDto.EndTime, workDb.EndTime, TimeSpan.FromSeconds(5));
            Assert.Equal(workDto.Comment, workDb.Comment);
            Assert.Equal(workDto.Hours, workDb.Hours);
        }

        [Fact]
        public async void DeleteWorkProjectAsync()
        {
            var project = EntitiesFactory.NewProject(developerIds: new[] { SessionDeveloper.Id }).Save();
            var work = EntitiesFactory.NewWork(Guid.NewGuid(), project.DeveloperProjects.Single().Id).Save();

            var (status, result) = await Request.DeleteAsync<ResultTest>(new Uri($"{Uri}/{project.Id}/works/{work.Id}"));

            var existWorkProject = await DbContext.Works.AnyAsync(d => d.Id == work.Id);
            Assert.Equal(Status.Success, status);
            Assert.True(result.Success);
            Assert.False(existWorkProject);
        }
    }
}
