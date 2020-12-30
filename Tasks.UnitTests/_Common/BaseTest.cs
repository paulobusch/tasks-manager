﻿using Tasks.UnitTests._Common.Factories;
using Xunit;

namespace Tasks.UnitTests._Common
{
    public class BaseTest : IClassFixture<TasksFixture>
    {
        protected readonly EntitiesFactory EntitiesFactory;

        public BaseTest(TasksFixture fixture)
        {
            EntitiesFactory = new EntitiesFactory(fixture.DbContext);
        }
    }
}
