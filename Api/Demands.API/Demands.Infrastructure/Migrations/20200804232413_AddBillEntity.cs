using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Demands.Infrastructure.Migrations
{
    public partial class AddBillEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BillId",
                table: "Order",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Bill",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Total = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TableId = table.Column<int>(nullable: false),
                    RegistrationDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    ClosedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bill", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bill_Table_TableId",
                        column: x => x.TableId,
                        principalTable: "Table",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Order_BillId",
                table: "Order",
                column: "BillId");

            migrationBuilder.CreateIndex(
                name: "IX_Bill_TableId",
                table: "Bill",
                column: "TableId");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Bill_BillId",
                table: "Order",
                column: "BillId",
                principalTable: "Bill",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Bill_BillId",
                table: "Order");

            migrationBuilder.DropTable(
                name: "Bill");

            migrationBuilder.DropIndex(
                name: "IX_Order_BillId",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "BillId",
                table: "Order");
        }
    }
}
