namespace SignalRSelfHost.infra.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Salas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Token = c.Int(nullable: false),
                        NomeUsuario = c.String(),
                        Data = c.DateTime(nullable: false),
                        Pontos = c.Int(nullable: false),
                        Nivel = c.Int(nullable: false),
                        NumeroUsuarios = c.Int(nullable: false),
                        isAtiva = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Salas");
        }
    }
}
