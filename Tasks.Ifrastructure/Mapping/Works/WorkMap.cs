﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tasks.Domain.Commands.Works;

namespace Tasks.Ifrastructure.Mapping
{
    public class WorkMap : IEntityTypeConfiguration<Work>
    {
        public void Configure(EntityTypeBuilder<Work> builder)
        {
            builder.ToTable("Works");

            builder.HasKey(w => w.Id);
            builder.Property(w => w.StartTime).IsRequired();
            builder.Property(w => w.EndTime).IsRequired();

            builder.HasIndex(w => w.StartTime);
            builder.HasIndex(w => w.EndTime);
        }
    }
}