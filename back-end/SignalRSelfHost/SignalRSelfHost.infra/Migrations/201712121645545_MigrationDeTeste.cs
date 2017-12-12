namespace SignalRSelfHost.infra.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrationDeTeste : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dh.Partida",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        NomeUsuario = c.String(nullable: false, maxLength: 128),
                        Pontos = c.Int(nullable: false),
                        Nivel = c.Int(nullable: false),
                        Data = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dh.Partida");
        }
    }
}
