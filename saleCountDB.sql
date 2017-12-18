CREATE DATABASE  IF NOT EXISTS `salecount` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `salecount`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: salecount
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.26-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item` (
  `name` varchar(100) DEFAULT NULL,
  `pic` varchar(250) DEFAULT NULL,
  `discription` varchar(800) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `storeId` int(11) NOT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `discount` float DEFAULT NULL,
  `quantity` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `storeId_fk` (`storeId`),
  CONSTRAINT `storeId_fk` FOREIGN KEY (`storeId`) REFERENCES `store` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` (`name`, `pic`, `discription`, `price`, `storeId`, `ID`, `discount`, `quantity`) VALUES ('adidas Originals Trefoil Black T-Shirt','/assets/data/items/addidasTshirt1.jpg','size L , M \n color black, white',200,3,1,0.5,1),('Adidas Soccer Pants Tiro','/assets/data/items/addidasPants1.jpg','size L . M\r  color black, white',1200,3,2,0.5,2),('Fc Barcelona Jearsy','/assets/data/items/nikeBarcelonaKit.jpg','size M, S , L \n ',800,2,3,0.2,3),('Regular Long Sleeve Buttonless Shirt','/assets/data/items/LcWakikiLongSleeve.jpg','Size S .  M .  L',450,1,4,0.3,1),('Regular Waist Trousers','/assets/data/items/LcWakikiWaistTrousers.jpg','Size S , M , L',600,1,5,0.1,2),('Sweater Vest','/assets/data/items/LcWakikiVest1.jpg','Size S , M , L',340,1,6,0.2,2),('Standard Undershirt','/assets/data/items/LcWakikiUnderShirt1.jpg','Size S , M , L',170,1,7,0.1,4),('Cardigan','/assets/data/items/LcWakikiCardigan.jpg','Size S , M , L',790,1,9,0.2,6);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rating` (
  `userId` int(11) NOT NULL,
  `storeId` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `rate` int(11) DEFAULT NULL,
  PRIMARY KEY (`userId`,`storeId`),
  KEY `storeId_rating_fk` (`storeId`),
  CONSTRAINT `storeId_rating_fk` FOREIGN KEY (`storeId`) REFERENCES `store` (`ID`),
  CONSTRAINT `userId_rating_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservations` (
  `userId` int(11) NOT NULL,
  `itemId` int(11) NOT NULL,
  `reservationDate` datetime DEFAULT NULL,
  KEY `itemId_fk` (`itemId`),
  KEY `userId_fk` (`userId`),
  CONSTRAINT `itemId_fk` FOREIGN KEY (`itemId`) REFERENCES `item` (`ID`),
  CONSTRAINT `userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` (`userId`, `itemId`, `reservationDate`) VALUES (2,9,'2017-12-18 12:42:39'),(2,9,'2017-12-18 12:43:56'),(2,5,'2017-12-18 12:44:05'),(2,4,'2017-12-18 12:47:34'),(2,4,'2017-12-18 12:59:13'),(2,5,'2017-12-18 01:03:13'),(2,6,'2017-12-18 01:03:40'),(2,6,'2017-12-18 01:05:38'),(2,6,'2017-12-18 01:05:42'),(2,1,'2017-12-18 01:26:06'),(4,7,'2017-12-18 01:33:58'),(4,6,'2017-12-18 01:34:06'),(4,3,'2017-12-18 01:35:53'),(1,3,'2017-12-18 01:37:38');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store` (
  `name` varchar(100) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `phoneNo` varchar(14) DEFAULT NULL,
  `pic` varchar(250) DEFAULT NULL,
  `discription` varchar(800) DEFAULT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` (`name`, `address`, `email`, `phoneNo`, `pic`, `discription`, `ID`) VALUES ('Lc Wakiki','Mall of Arabia','lcWakiki@yahoo.com','01069473719','/assets/data/pics/lcWakiki.jpg','store were you can find all the clothes you need',1),('Nike','City Stars','Nike@Nike.com','01099046537','/assets/data/pics/nike.jpg','every thing that falcilitates your sporty life can be found at our store',2),('Addidas','Mall Of Arabia','addidas@hotmail.com','01001007907','/assets/data/pics/adiddas.jpg','the best store ever',3),('Zara','Cairo Mall','Zara@zara.com','010011102','/assets/data/pics/zara.jpg','Zaraa is the best',4);
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `fName` varchar(40) DEFAULT NULL,
  `lName` varchar(40) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `phoneNo` varchar(14) DEFAULT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(40) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `storeOrNot` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`fName`, `lName`, `address`, `email`, `phoneNo`, `ID`, `password`, `gender`, `storeOrNot`) VALUES ('Waleed','Hazem','6th October','walidmoussa995@gmail.com','01063074739',1,'1234','M',0),('Ahmed','Adel','6th October','ahmedadel@hotmail.com','01001007907',2,'1234','M',0),('Adel','Zakaria','6th October','adel@hotmail.com','01001111785',3,'1234','M',0),('May','Ashraf','Tagmo3','may@gmail.com','01000000000',4,'1234','F',0),('Addidas','store','Mall of Arabia','addidas@addidas.com','0100',5,'12345','M',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-18  2:46:30
