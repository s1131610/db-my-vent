-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 07, 2021 at 09:10 PM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myvent`
--

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
CREATE TABLE IF NOT EXISTS `event` (
  `eventID` int(11) NOT NULL AUTO_INCREMENT,
  `eventMgrID` int(11) NOT NULL,
  `eventName` varchar(45) DEFAULT NULL,
  `eventDate` date DEFAULT NULL,
  `active` int(2) NOT NULL,
  PRIMARY KEY (`eventID`),
  KEY `eventMgrID_idx` (`eventMgrID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`eventID`, `eventMgrID`, `eventName`, `eventDate`, `active`) VALUES
(1, 1, NULL, NULL, 1),
(2, 1, 'Justins Grad Party', '2021-06-15', 1),
(4, 1, 'Robs Grad Party', '2021-06-15', 1),
(5, 1, 'Robs Grad Party', '2021-06-15', 1);

-- --------------------------------------------------------

--
-- Table structure for table `eventmanager`
--

DROP TABLE IF EXISTS `eventmanager`;
CREATE TABLE IF NOT EXISTS `eventmanager` (
  `userID` int(11) NOT NULL,
  `eventMgrID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`eventMgrID`),
  KEY `userID_idx` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `eventmanager`
--

INSERT INTO `eventmanager` (`userID`, `eventMgrID`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `eventnote`
--

DROP TABLE IF EXISTS `eventnote`;
CREATE TABLE IF NOT EXISTS `eventnote` (
  `eventID` int(11) NOT NULL,
  `noteID` int(11) NOT NULL AUTO_INCREMENT,
  `note` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`noteID`),
  KEY `eventID_idx` (`eventID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `eventnote`
--

INSERT INTO `eventnote` (`eventID`, `noteID`, `note`) VALUES
(1, 3, 'This is a note and is not a default value');

-- --------------------------------------------------------

--
-- Table structure for table `serviceoffered`
--

DROP TABLE IF EXISTS `serviceoffered`;
CREATE TABLE IF NOT EXISTS `serviceoffered` (
  `servOfferedID` int(11) NOT NULL AUTO_INCREMENT,
  `typeID` int(11) NOT NULL,
  `svcProvID` int(11) NOT NULL,
  `service` varchar(255) NOT NULL,
  PRIMARY KEY (`servOfferedID`,`typeID`,`svcProvID`),
  KEY `svcProvID_idx` (`svcProvID`),
  KEY `typeID_idx` (`typeID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `serviceoffered`
--

INSERT INTO `serviceoffered` (`servOfferedID`, `typeID`, `svcProvID`, `service`) VALUES
(1, 1, 1, 'Light Show');

-- --------------------------------------------------------

--
-- Table structure for table `serviceprovider`
--

DROP TABLE IF EXISTS `serviceprovider`;
CREATE TABLE IF NOT EXISTS `serviceprovider` (
  `userID` int(11) NOT NULL,
  `svcProvID` int(11) NOT NULL AUTO_INCREMENT,
  `businessName` varchar(45) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `websiteURL` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`svcProvID`),
  KEY `userID` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `serviceprovider`
--

INSERT INTO `serviceprovider` (`userID`, `svcProvID`, `businessName`, `state`, `websiteURL`) VALUES
(2, 1, 'Rob\'s Light Show', 'NJ', 'LightShow.com');

-- --------------------------------------------------------

--
-- Table structure for table `servicetype`
--

DROP TABLE IF EXISTS `servicetype`;
CREATE TABLE IF NOT EXISTS `servicetype` (
  `typeID` int(11) NOT NULL AUTO_INCREMENT,
  `serviceName` varchar(45) NOT NULL,
  PRIMARY KEY (`typeID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `servicetype`
--

INSERT INTO `servicetype` (`typeID`, `serviceName`) VALUES
(1, 'Rob\'s Light Show');

-- --------------------------------------------------------

--
-- Table structure for table `svcprovnote`
--

DROP TABLE IF EXISTS `svcprovnote`;
CREATE TABLE IF NOT EXISTS `svcprovnote` (
  `noteID` int(11) NOT NULL AUTO_INCREMENT,
  `svcProvID` int(11) NOT NULL,
  `note` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`noteID`),
  KEY `svcProvID_idx` (`svcProvID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `svcprovnote`
--

INSERT INTO `svcprovnote` (`noteID`, `svcProvID`, `note`) VALUES
(2, 1, 'This is a note and is not a default value');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(30) NOT NULL,
  `active` int(2) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `email`, `name`, `password`, `active`) VALUES
(1, 'justinA@gmail.com', 'Justin A', 'password', 1),
(2, 'rosmith@gmail.com', 'Rob SM', 'psswrd', 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `eventMgrID` FOREIGN KEY (`eventMgrID`) REFERENCES `eventmanager` (`eventMgrID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `eventmanager`
--
ALTER TABLE `eventmanager`
  ADD CONSTRAINT `userID0` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `eventnote`
--
ALTER TABLE `eventnote`
  ADD CONSTRAINT `eventnote_ibfk_1` FOREIGN KEY (`eventID`) REFERENCES `event` (`eventID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `serviceoffered`
--
ALTER TABLE `serviceoffered`
  ADD CONSTRAINT `svcProvID` FOREIGN KEY (`svcProvID`) REFERENCES `serviceprovider` (`svcProvID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `typeID` FOREIGN KEY (`typeID`) REFERENCES `servicetype` (`typeID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `serviceprovider`
--
ALTER TABLE `serviceprovider`
  ADD CONSTRAINT `userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `svcprovnote`
--
ALTER TABLE `svcprovnote`
  ADD CONSTRAINT `svcprovnote_ibfk_1` FOREIGN KEY (`svcProvID`) REFERENCES `serviceprovider` (`svcProvID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
