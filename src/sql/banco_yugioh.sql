DROP DATABASE IF EXISTS banco_exodia;
CREATE DATABASE banco_exodia; 
USE banco_exodia;

CREATE TABLE Cartas (
    idCarta INT unsigned  NOT NULL,
    nome VARCHAR(150) NOT NULL,
    imagem VARCHAR(255) NULL, 
    descricao TEXT NULL,
    dataInsercao DATETIME  DEFAULT CURRENT_TIMESTAMP,
		CONSTRAINT id_carta_pk primary key (idCarta)
)engine=InnoDB; 

-- criação da tabela monstros

CREATE TABLE Monstros (

idCarta INT unsigned NOT NULL,
defesa int null,
nivel int null,
raca varchar(50) null,
ataque int null, 

    CONSTRAINT chk_ataque
        CHECK (ataque >= 0),
        
    CONSTRAINT chk_defesa
        CHECK (defesa >= 0),
        
    CONSTRAINT chk_nivel
        CHECK (nivel >= 0),
        

	constraint id_monstro_pk primary key (idCarta),
	constraint id_monstro_fk foreign key (idCarta) 
		references Cartas (idCarta)

)engine=InnoDB; 

-- criação da tabela armadilhas

CREATE TABLE Armadilhas(
idCarta INT unsigned NOT NULL,
tipoArmadilha varchar(40) NULL,

	constraint id_armadilha_pk primary key (idCarta),
	constraint id_armadilha_fk foreign key (idCarta)
		references Cartas (idCarta)

)engine=InnoDB;

-- criação da tabela feitiços

CREATE TABLE Feiticos (
idCarta INT unsigned NOT NULL,
tipoFeitico VARCHAR(30) NULL,

	constraint id_feitico_pk primary key (idCarta), 
	constraint id_feitico_fk foreign key (idCarta)
		references Cartas (idCarta)

)engine=InnoDB;



CREATE TABLE Colecoes(
idColecao  varchar(30) NOT NULL,
nome VARCHAR(150) NOT NULL,
raridade varchar(30) NULL,
dataInsercao DATETIME  DEFAULT CURRENT_TIMESTAMP,
	constraint id_colecao_pk primary key (idColecao)
)engine=InnoDB;

SHOW TABLES;

CREATE TABLE CartasColecoes(
idColecao varchar(30) NOT NULL,
idCarta INT unsigned  NOT NULL,

	constraint id_cartas_colecao_pk primary key (idColecao,idCarta),
    constraint id_cartas foreign key (idCarta)
		references Cartas (idCarta),
	constraint id_Colecoes foreign key (idColecao)
		references Colecoes (idColecao)
)engine=InnoDB;


-- ---------------------------------------------------- VIEWs -------------------------------------------------------- --



CREATE VIEW view_monstro AS 
SELECT
	 c.idCarta,
	 c.nome,
	 c.imagem,
	 c.descricao,
	 m.defesa,
	 m.nivel,
	 m.raca,
	 m.ataque
FROM Cartas c
INNER JOIN Monstros m ON m.idCarta = c.idCarta;


CREATE VIEW view_armadilha AS
SELECT 
	c.idCarta,
	c.nome,
	c.imagem,
	c.descricao,
	a.tipoArmadilha
FROM Cartas c
INNER JOIN Armadilhas a ON a.idCarta = c.idCarta;
 
 
CREATE VIEW view_feitico AS
SELECT 
c.idCarta,
c.nome,
c.imagem,
c.descricao,
f.tipoFeitico
FROM Cartas c
INNER JOIN Feiticos f ON f.idCarta = c.idCarta;


CREATE VIEW view_colecao_cartas AS
SELECT 
c.idCarta,
cc.idColecao,
co.nome,
co.raridade
FROM Cartas c
INNER JOIN CartasColecoes cc ON cc.idCarta = c.idCarta
INNER JOIN Colecoes co ON co.idColecao = cc.idColecao;

-- ---------------------------------------------------- Permissões VIEW -------------------------------------------------------- --


CREATE USER 'app_yugioh'@'%' IDENTIFIED BY 'YuGiOh2026';

DROP USER 'app_yugioh'@'%';

REPAIR TABLE tables_priv;


GRANT SELECT ON banco_exodia.view_monstro TO 'app_yugioh'@'%';
GRANT SELECT ON banco_exodia.view_armadilha TO 'app_yugioh'@'%';
GRANT SELECT ON banco_exodia.view_feitico TO 'app_yugioh'@'%';
GRANT SELECT ON banco_exodia.view_colecao_cartas TO 'app_yugioh'@'%';

GRANT SELECT, INSERT, UPDATE, DELETE ON banco_exodia.Cartas TO 'app_yugioh'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON banco_exodia.Monstros TO 'app_yugioh'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON banco_exodia.Armadilhas TO 'app_yugioh'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON banco_exodia.Feiticos TO 'app_yugioh'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON banco_exodia.Colecoes TO 'app_yugioh'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON banco_exodia.CartasColecoes TO 'app_yugioh'@'%';

-- ---------------------------------------------------- CONSULTAS -------------------------------------------------------- --


SELECT * 
FROM Cartas c
INNER JOIN CartasColecoes cc ON cc.idCarta = c.idCarta
INNER JOIN Colecoes co ON co.idColecao = cc.idColecao
ORDER BY c.idCarta;




SELECT raca, AVG(ataque) AS mediaAtaque, COUNT(*) AS quantidadeMonstros
FROM Monstros m
INNER JOIN Cartas c ON c.idCarta = m.idCarta
GROUP BY raca;


SELECT *
FROM Colecoes c;
-- WHERE raridade LIKE '%Rare';


select c.nome, f.tipoFeitico, length(c.descricao) as length_descricao, replace(c.descricao, 'monster', 'monstrinho') as replace_de_monstro
from Feiticos f
inner join Cartas c on c.idCarta = f.idCarta;


SELECT c.idCarta,c.nome, count(co.idColecao) AS quantidade_colecoes
FROM cartas c
INNER JOIN CartasColecoes cc ON cc.idCarta = c.idCarta
INNER JOIN Colecoes co ON co.idColecao = cc.idColecao
GROUP BY c.idCarta;


SELECT m.idCarta, c.nome, m.raca, m.nivel, m.defesa  
FROM Monstros m
INNER JOIN Cartas c ON c.idCarta = m.idCarta
ORDER BY m.defesa DESC;


SELECT *
FROM monstros m
WHERE m.ataque > (
SELECT AVG(m.ataque)
 FROM monstros m
 );
 
 SELECT * 
 From Cartas c
 WHERE minute(dataInsercao) > 19;
 
 select *
 From Armadilhas a
 inner join Cartas c  on c.idCarta = a.idCarta
 where day(c.dataInsercao)  > 20;