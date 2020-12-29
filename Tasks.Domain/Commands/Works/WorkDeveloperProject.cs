﻿using System;
using Tasks.Domain.Commands.Developers;
using Tasks.Domain.Utils.Bases;

namespace Tasks.Domain.Commands.Works
{
    public class WorkDeveloperProject : EntityBase
    {
        public Guid DeveloperProjectId { get; private set; }
        public Guid WorkId { get; private set; }

        public virtual DeveloperProject DeveloperProject { get; private set; } 
        public virtual Work Work { get; private set; }

        protected WorkDeveloperProject() : base() { }

        public WorkDeveloperProject(
            Guid id,
            Guid developerProjectId,
            Guid workId
        ) : base(id) { 
            DeveloperProjectId = developerProjectId;
            WorkId = workId;
        }
    }
}
