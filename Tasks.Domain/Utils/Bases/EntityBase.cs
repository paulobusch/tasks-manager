﻿using System;

namespace Tasks.Domain.Utils.Bases
{
    public abstract class EntityBase
    {
        public Guid Id { get; protected set; }

        protected EntityBase() { }
        protected EntityBase(Guid id) {
            Id = id == Guid.Empty ? Guid.NewGuid() : id;    
        }
    }
}