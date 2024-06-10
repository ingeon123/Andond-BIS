-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.36 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- anubuspot 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `anubuspot` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `anubuspot`;

-- 테이블 anubuspot.busarrivedinfo 구조 내보내기
CREATE TABLE IF NOT EXISTS `busarrivedinfo` (
  `bus_Id` int NOT NULL COMMENT '버스 고유 ID',
  `route_Id` int NOT NULL COMMENT '노선 고유 ID',
  `station_Id` int NOT NULL COMMENT '정류소 고유 ID',
  `predict_Tm` int NOT NULL COMMENT '도착시간',
  `route_Num` int NOT NULL COMMENT '노선 번호',
  PRIMARY KEY (`bus_Id`),
  KEY `route_Id` (`route_Id`),
  KEY `station_Id` (`station_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='정류소 버스 도착 정보\r\n현재 정류소 기준 버스도착 정보 제공, 차량 정보 및 도착예정 시간 제공, 도착시간 단위는 분 사용\r\n';

-- 테이블 데이터 anubuspot.busarrivedinfo:~0 rows (대략적) 내보내기

-- 테이블 anubuspot.facstationinfo 구조 내보내기
CREATE TABLE IF NOT EXISTS `facstationinfo` (
  `station_Id` int NOT NULL COMMENT '정류소 고유 ID',
  `station_Nm` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '정류소 국문 이름',
  `station_EngNm` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '정류소 영문 이름',
  `gpsX` float NOT NULL COMMENT '경도',
  `gpsY` float NOT NULL COMMENT '위도',
  `mobi_Num` float COMMENT '모바일 번호',
  `gov_Cd` float NOT NULL COMMENT '지역코드',
  `gov_CdNm` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '지역코드 명',
  PRIMARY KEY (`station_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='정류소 정보\r\n경북 안동시 정류소 위치정보(위경도) 좌표계 정보 : WGS84';

-- 테이블 데이터 anubuspot.facstationinfo:~0 rows (대략적) 내보내기

-- 테이블 anubuspot.routebusinfo 구조 내보내기
CREATE TABLE IF NOT EXISTS `routebusinfo` (
  `bus_Id` int NOT NULL COMMENT '버스 고유 ID',
  `route_Id` int NOT NULL COMMENT '노선 고유 ID',
  `bus_Num` int NOT NULL COMMENT '버스 번호',
  `gpsX` float NOT NULL COMMENT '경도',
  `gpsY` float NOT NULL COMMENT '위도',
  `from_Station` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '버스 출발 정류장',
  `to_Station` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '버스 도착 정류장',
  PRIMARY KEY (`bus_Id`),
  KEY `route_Id` (`route_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='노선별 운행 버스 정보\r\n각 차량별 위치정보(위경도) 좌표계 정보 : WGS86, 운행 버스 번호, 현재 출발 정류장, 다음 도착 정류장';

-- 테이블 데이터 anubuspot.routebusinfo:~0 rows (대략적) 내보내기

-- 테이블 anubuspot.routestationinfo 구조 내보내기
CREATE TABLE IF NOT EXISTS `routestationinfo` (
  `route_Id` int NOT NULL COMMENT '노선 고유 ID',
  `station_Id` int NOT NULL COMMENT '정류소 고유 ID',
  `station_Ord` int NOT NULL COMMENT '정류소 순번',
  `station_Nm` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '정류소 이름',
  `gpsX` float NOT NULL COMMENT '경도',
  `gpsY` float NOT NULL COMMENT '위도',
  PRIMARY KEY (`route_Id`),
  KEY `station_Id` (`station_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='노선 별 정류소\r\n안동시 운행버스 정보 제공, 기종점 정류소 정보 제공, 좌표계 정보 : WGS84';

-- 테이블 데이터 anubuspot.routestationinfo:~0 rows (대략적) 내보내기

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
