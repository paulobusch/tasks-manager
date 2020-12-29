﻿using System;
using System.Collections.Generic;
using Tasks.Domain.Commands.Developers;
using Tasks.Domain.Utils.Bases;

namespace Tasks.Domain.Commands.Projects
{
    public class Project : EntityBase
    {
        public string Title { get; private set; }
        public string Description { get; private set; }

        public virtual IEnumerable<DeveloperProject> DeveloperProjects { get; private set; }

        protected Project() : base() { }

        public Project(
            Guid id,
            string title,
            string description
        ) : base(id)
        {
            this.SetData(
                title: title,
                description: description
            );
        }

        public void SetData(
            string title,
            string description
        ) {
            this.Title = title;
            this.Description = description;
        }
    }
}