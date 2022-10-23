using Database.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.TypeConfigurations;

public class UserRolesConfiguration : IEntityTypeConfiguration<UserRole>
{
    public void Configure(EntityTypeBuilder<UserRole> builder)
    {
        builder.HasData(
            new UserRole()
            {
                Id = 1,
                RoleName = "Admin"
            },
            new UserRole()
            {
                Id = 2,
                RoleName = "User"
            });
    }
}