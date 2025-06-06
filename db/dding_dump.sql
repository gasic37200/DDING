-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: dding_db
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board_tb`
--

DROP TABLE IF EXISTS `board_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_tb` (
  `board_no` int NOT NULL,
  `board_title` varchar(50) DEFAULT NULL,
  `board_content` varchar(500) DEFAULT NULL,
  `board_pass` varchar(10) DEFAULT NULL,
  `create_by` varchar(10) DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  `board_hits` int DEFAULT NULL,
  `image_attached` int DEFAULT NULL,
  PRIMARY KEY (`board_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_tb`
--

LOCK TABLES `board_tb` WRITE;
/*!40000 ALTER TABLE `board_tb` DISABLE KEYS */;
/*!40000 ALTER TABLE `board_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like_tb`
--

DROP TABLE IF EXISTS `like_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like_tb` (
  `menu_name` varchar(100) NOT NULL,
  `like_count` int DEFAULT NULL,
  PRIMARY KEY (`menu_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_tb`
--

LOCK TABLES `like_tb` WRITE;
/*!40000 ALTER TABLE `like_tb` DISABLE KEYS */;
/*!40000 ALTER TABLE `like_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_tb`
--

DROP TABLE IF EXISTS `member_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_tb` (
  `member_no` int NOT NULL AUTO_INCREMENT,
  `member_name` varchar(10) DEFAULT NULL,
  `member_id` varchar(20) DEFAULT NULL,
  `member_pass` varchar(20) DEFAULT NULL,
  `member_phone` varchar(20) DEFAULT NULL,
  `member_email` varchar(20) DEFAULT NULL,
  `member_addr` varchar(100) DEFAULT NULL,
  `member_date` date DEFAULT NULL,
  `login_type` varchar(20) DEFAULT NULL,
  `provider_id` varchar(100) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`member_no`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_tb`
--

LOCK TABLES `member_tb` WRITE;
/*!40000 ALTER TABLE `member_tb` DISABLE KEYS */;
INSERT INTO `member_tb` VALUES (1,'?띻만??,'hong123','password123','010-1234-5678','hong@domain.com','?쒖슱??媛뺣궓援?,'2025-05-13','LOCAL','1234567890','ROLE_USER');
/*!40000 ALTER TABLE `member_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_like_tb`
--

DROP TABLE IF EXISTS `menu_like_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_like_tb` (
  `like_no` int NOT NULL AUTO_INCREMENT,
  `member_no` int NOT NULL,
  `menu_name` varchar(255) NOT NULL,
  `liked_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_no`),
  UNIQUE KEY `member_no` (`member_no`,`menu_name`),
  CONSTRAINT `fk_menu_like_user` FOREIGN KEY (`member_no`) REFERENCES `member_tb` (`member_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_like_tb`
--

LOCK TABLES `menu_like_tb` WRITE;
/*!40000 ALTER TABLE `menu_like_tb` DISABLE KEYS */;
INSERT INTO `menu_like_tb` VALUES (1,1,'諛깅?諛?,'2025-05-22 00:00:00');
/*!40000 ALTER TABLE `menu_like_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_review_tb`
--

DROP TABLE IF EXISTS `menu_review_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_review_tb` (
  `review_no` int NOT NULL AUTO_INCREMENT,
  `member_no` int NOT NULL,
  `menu_name` varchar(255) NOT NULL,
  `review_content` text NOT NULL,
  `review_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_no`),
  KEY `member_no` (`member_no`),
  CONSTRAINT `menu_review_tb_ibfk_1` FOREIGN KEY (`member_no`) REFERENCES `member_tb` (`member_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_review_tb`
--

LOCK TABLES `menu_review_tb` WRITE;
/*!40000 ALTER TABLE `menu_review_tb` DISABLE KEYS */;
/*!40000 ALTER TABLE `menu_review_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_tb`
--

DROP TABLE IF EXISTS `menu_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_tb` (
  `menu_no` int NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(200) DEFAULT NULL,
  `menu_date` date DEFAULT NULL,
  PRIMARY KEY (`menu_no`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_tb`
--

LOCK TABLES `menu_tb` WRITE;
/*!40000 ALTER TABLE `menu_tb` DISABLE KEYS */;
INSERT INTO `menu_tb` VALUES (1,'?덇퉴?ㅼ뭅?덈뜮諛??곕룞?κ뎅,?ㅻ━?뷀깉?쒕젅?깆깘?щ뱶(蹂?숆???,伊ъ떆荑?諛곗텛源移?,'2025-05-19'),(2,'諛깅?諛??좎콈?쒖옣援?媛꾩옣?쇱?遺덈갚,源먰뭾留뚮몢,留덉뭅濡쒕땲肄섏깘?щ뱶,諛곗텛源移?,'2025-05-20'),(3,'諛깅?諛??쇱?怨좉린源移섏컡媛??덈퉬?꾨땲&耳李?留덈뒛已묐Т移?肄⑸굹臾쇰Т移?諛곗텛源移?,'2025-05-21'),(4,'諛깅?諛??됰え諛,?덉슦?源,?⑤Т吏,諛곗텛源移?,'2025-05-22'),(5,'源移섎낭?뚮갈,?대У援?移섑궓?덇쿊&癒몄뒪????ㅼ쐞?쒕젅?깆깘?щ뱶,?붽뎄瑜댄듃,諛곗텛源移?,'2025-05-23'),(6,'?꾩빞梨꾨낭?뚮갈,?꾩슧?쒖옣援?源留먯씠?源&媛꾩옣,?곴꺼?먯??쇱깘?щ뱶,痍⑤굹臾쇰Т移?諛곗텛源移?,'2025-05-12'),(7,'諛깅?諛?洹쇰?怨좎텛?κ뎅,怨좎궗由ъ젣?〓낭??鍮꾩뿏?섎낭???ㅻ났吏,諛곗텛源移?,'2025-05-13'),(8,'諛깅?諛??좊??κ뎅,?앹꽑源뚯뒪&?瑜댄?瑜댁냼???좊쭏?좏뫖?ㅻ━?뚯뒪?,臾대쭚??씠臾댁묠,諛곗텛源移?,'2025-05-14'),(9,'諛깅?諛?怨꾨?吏щ퐬援??뺤닔???뚯뒪,吏쒖옣?뚯뒪,?⑤Т吏,諛곗텛源移?,'2025-05-15'),(10,'諛깅?諛?留묒?媛먯옄援??몄뼇?앸텋怨좉린,鍮④컙?대У蹂띠쓬,?좏뵆?ㅼ쐞?쒕젅?깆깘?щ뱶,諛곗텛源移?,'2025-05-16'),(11,'?대Т','2025-05-05'),(12,'?대Т','2025-05-06'),(13,'諛깅?諛?肄⑸굹臾쇨뎅,源移섏젣?〓낭???곕몢遺&媛꾩옣,?쒖쿋?섎Ъ,諛곗텛源移?,'2025-05-07'),(14,'諛깅?諛?遺?李뚭컻,誘명듃蹂쇰뜲由ъ빞?쇰낭??留덈뒛已묐Т移??붽뎄瑜댄듃,諛곗텛源移?,'2025-05-08'),(15,'?섏씠?쇱씠??誘몄뿭?κ뎅,怨좉뎄留덈쭧???먮몢?쒕젅?깆깘?щ뱶,諛곗텛源移?,'2025-05-09'),(16,'諛깅?諛?洹쇰?怨좎텛?κ뎅,泥대떎移섏쫰?⑤컯?ㅽ뀒?댄겕,媛먯옄?源&耳李??⑦샇諛뺤깘?щ뱶,諛곗텛源移?,'2025-04-28'),(17,'?꾨쭏?붾뜮諛??먮?源移섍뎅,?ル룄洹?耳李?怨꾨??꾨씪??移섏빱由ъ빞梨꾨Т移?諛곗텛源移?,'2025-04-29'),(18,'諛깅?諛??좎콈?쒖옣援?怨좎궗由ш퀬異붿옣遺덇퀬湲?留덉뭅濡쒕땲肄섏깘?щ뱶,?쒖쿋?섎Ъ,諛곗텛源移?,'2025-04-30'),(19,'?대Т','2025-05-01'),(20,'諛깅?諛??곕룞?κ뎅,?ㅼ퐫?몃??쇳궎移댁툩,?좊쭏?좏뫖?ㅻ━?뚯뒪?,?⑤Т吏臾댁묠,諛곗텛源移?,'2025-05-02'),(21,'諛깅?諛?留묒??쒕몢遺援??쇱?怨좉린??갯,沅곸콈?덉엫,留ㅼ슫肄⑸굹臾쇰Т移?諛곗텛源移?,'2025-04-21'),(22,'留덉젣??갈,肄⑷?猷⑤같異붽뎅,移섑궓?덇쿊&癒몄뒪????붽굅?몃뱶?덉떛?먮윭??諛곗텛源移?,'2025-04-22'),(23,'移대젅?곕룞,?꾩슧援??덉슦?源&?뚯뒪,諛쒖궗誘밸뱶?덉떛?먮윭??諛곗텛源移?,'2025-04-23'),(24,'諛깅?諛?留묒?媛먯옄援?源移섏젣?〓낭??蹂쇱뼱臾듭빞梨꾨낭??泥?꼍梨꾨Т移?諛곗텛源移?,'2025-04-24'),(25,'源諛λ낭?뚮갈,?곕룞?κ뎅,源먰뭾留뚮몢,?ㅻ났吏,諛곗텛源移?,'2025-04-25'),(26,'<釉붾옓?곗씠>,?덉쑁吏쒖옣諛??좊?誘몄냼?κ뎅,?쇱콈異섍텒&源留먯씠,with 移좊━?뚯뒪,?⑤Т吏,諛곗텛源移?,'2025-04-14'),(27,'諛깅?諛?李몄튂源移섏컡媛??곕몢遺&媛꾩옣,媛먯옄怨좊줈耳&耳李??쒖쿋?섎Ъ,諛곗텛源移?,'2025-04-15'),(28,'?쒖쑁??갈,?대У援?移섏쫰?ㅽ떛,肄⑹옄諛?肄⑸굹臾??곸텛,諛곗텛源移?,'2025-04-16'),(29,'諛깅?諛?移섑궓源뚯뒪,&?щ━誘몄뼱?덉뼵?쒕젅???ㅻえ?ы뻹媛먯옄梨꾨낭???쒖쿋?섎Ъ臾댁묠,諛곗텛源移?,'2025-04-17'),(30,'諛깅?諛???컻??誘명듃蹂쇱빞梨꾨낭??遺異붿빞梨꾨Т移?諛곗텛源移?,'2025-04-18'),(31,'諛깅?諛??쇨컝?대맂?κ뎅,?먭렇?⑤컯?ㅽ뀒?댄겕&?뚯뒪,移섏빱由ъ삱由щ툕?붽굅?몄깘?щ뱶,?숈＜?섎Ъ蹂띠쓬,諛곗텛源移?,'2025-04-07'),(32,'??컝鍮꾨뜮諛??좊??κ뎅,?ル룄洹?耳泥??덈굹臾?珥덉옣,?⑤Т吏,諛곗텛源移?,'2025-04-08'),(33,'諛깅?諛??먮??쒖옣援?肄⑸굹臾쇰텋怨좉린,?≪콈,?ㅻ났吏,諛곗텛源移?,'2025-04-09'),(34,'諛깅?諛?怨고깢&?뚮㈃,梨꾩뼱臾듬낭???꾪넗由щУ&?묐뀗??臾대쭚??씠,諛곗텛源移?,'2025-04-10'),(35,'?섏씠?쇱씠?ㅻ뜮諛??좎콈怨좎텛?κ뎅,移섑궓?덇쿊&癒몄뒪?곕뱶,?묐같異붾옖移섎뱶?덉떛?먮윭??諛곗텛源移?,'2025-04-11'),(36,'諛깅?諛??좎콈?쒖옣援??덉쑁源移섏컻,?⑤━?쇰옖移섎뱶?덉떛?먮윭??肄⑸굹臾쇰Т移?諛곗텛源移?,'2025-03-31'),(37,'諛섍퀎??諛깅?諛?遺異붽쾳?덉씠,?붽뎄瑜댄듃,諛곗텛源移?,'2025-04-01'),(38,'諛깅?諛?誘몄뿭?쒖옣援??뚯콈?덇퉴???뚯뒪,已꾨㈃?쇱콈臾댁묠,肄⑹옄諛?諛곗텛源移?,'2025-04-02'),(39,'諛깅?諛?怨꾨??뚭뎅,??텋?λ뤌吏遺덇퀬湲??댁돩釉뚮씪??耳泥?誘몃땲?덉넚?대쾭??낭??諛곗텛源移?,'2025-04-03'),(40,'源移섎낭?뚮갈,?묒넚?댁뒪????꾨え?앸뭇?뚮뱶?꾩튂,?몄떎由ы넗留덊넗?먮윭??諛곗텛源移?,'2025-04-04'),(41,'諛깅?諛??쒕몢遺李뚭컻,遺덈떗?щ┝?곕룞,?↔컝鍮꾩“由??ㅻ났吏,諛곗텛源移?,'2025-03-24'),(42,'?꾨쭏?붾뜮諛?援?Ъ?〓낭??移섏빱由ы궎?꾨뱶?덉떛?먮윭??諛곗텛源移??뚯깉?곗묩','2025-03-25'),(43,'諛깅?諛?留묒?肄⑸굹臾쇨뎅,留덈씪?밴텋,臾쇰쭔??媛꾩옣,?⑤Т吏,諛곗텛源移?,'2025-03-26'),(44,'諛깅?諛??쇱?源移섏컡媛?媛먯옄怨좊줈耳,誘몄뿭以꾧굅由?留덉뭅濡쒕땲肄섏깘?щ뱶,諛곗텛源移?,'2025-03-27'),(45,'?ㅻ??쇱씠??誘몄냼?κ뎅,?뚯떆吏,?붽뎄瑜댄듃,諛곗텛源移?,'2025-03-28'),(46,'諛깅?諛?留묒?誘몄뿭援?移섑궓源뚯뒪&移좊━?뚯뒪,?좊쭏?좊??몃낵,?ㅼ쐞?쒕젅?깆깘?щ뱶,臾대쭚??씠,諛곗텛源移?,'2025-03-17'),(47,'諛깅?諛?源移섍뎅,?뚯콈諛붿떦遺덇퀬湲??먮?援ъ씠&?묐뀗??怨좎궗由щ낭??諛곗텛源移?,'2025-03-18'),(48,'?쇱콈鍮꾨퉼諛?留묒?萸뉕뎅,遺꾪솉?뚯꽭吏??諛곗텛源移?,'2025-03-19'),(49,'諛깅?諛??먮??쒖옣援?鍮꾨퉼移쇨뎅??遺異붽퀬紐?誘몃땲?⑤컯?ㅽ뀒?댄겕,怨꾩젅?섎Ъ臾댁묠,諛곗텛源移?,'2025-03-20'),(50,'吏쒖옣諛?怨꾨??뚭뎅,?뺤닔???⑤Т吏遺異붾Т移?諛곗텛源移?,'2025-03-21');
/*!40000 ALTER TABLE `menu_tb` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-26 11:03:29
