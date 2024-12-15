package com.ecotrace.repository;

import com.ecotrace.model.CO2EmissionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;
import java.util.Map;

public interface CO2EmissionRepository extends JpaRepository<CO2EmissionModel, Long> {
    @Query("SELECT WEEK(e.date) AS week, YEAR(e.date) AS year, SUM(e.co2_emission) AS total " +
            "FROM CO2EmissionModel e WHERE e.user.id = :userId " +
            "GROUP BY YEAR(e.date), WEEK(e.date) " +
            "ORDER BY YEAR(e.date), WEEK(e.date)")
    List<Map<String, Object>> aggregateCo2ByWeek(@Param("userId") Long userId);

    @Query("SELECT MONTH(e.date) AS month, YEAR(e.date) AS year, SUM(e.co2_emission) AS total " +
            "FROM CO2EmissionModel e WHERE e.user.id = :userId " +
            "GROUP BY YEAR(e.date), MONTH(e.date) " +
            "ORDER BY YEAR(e.date), MONTH(e.date)")
    List<Map<String, Object>> aggregateCo2ByMonth(@Param("userId") Long userId);

    @Query(value="SELECT e.date AS date, SUM(e.co2_emission) AS total " +
            "FROM co2_emissions e WHERE e.user_id = :userId " +
            "AND e.date >= CURRENT_DATE - INTERVAL 7 DAY " +
            "GROUP BY e.date " +
            "ORDER BY e.date DESC", nativeQuery = true)
    List<Map<String, Object>> aggregateCo2ByDayLast7Days(@Param("userId") Long userId);

    @Query(value="SELECT e.date AS date, SUM(e.co2_emission) AS total " +
            "FROM co2_emissions e WHERE e.user_id = :userId " +
            "AND e.date >= CURRENT_DATE - INTERVAL 30 DAY " +
            "GROUP BY e.date " +
            "ORDER BY e.date DESC", nativeQuery = true)
    List<Map<String, Object>> aggregateCo2ByDayLast30Days(@Param("userId") Long userId);

    @Query(value="SELECT IFNULL(SUM(e.co2_emission), 0) AS total " +
    "FROM co2_emissions e WHERE e.user_id= :userId " +
    "AND e.date = CURRENT_DATE", nativeQuery = true)
    float aggregateCo2Today(@Param("userId") Long userId);

    @Query(value="SELECT e.date AS datem, SUM(e.co2_emission) AS emission " +
            "FROM co2_emissions e WHERE e.user_id= :userId " +
            "GROUP BY e.date ORDER BY emission DESC LIMIT 1", nativeQuery = true)
    Object[] aggregateMaxCo2Day(@Param("userId") Long userId);

    @Query(value="SELECT e.date AS datem, SUM(e.co2_emission) AS emission " +
            "FROM co2_emissions e WHERE e.user_id= :userId " +
            "GROUP BY e.date ORDER BY emission ASC LIMIT 1", nativeQuery = true)
    Object[] aggregateMinCo2Day(@Param("userId") Long userId);
}