package com.ecotrace.controller;

import com.ecotrace.dto.EmissionDay;
import com.ecotrace.service.UsersService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/co2")
public class DataController {
    private final UsersService usersService;

    public DataController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("/weekly")
    public ResponseEntity<List<Map<String, Object>>> getWeeklyCo2Emission(@RequestParam Long user_id) {
        List<Map<String, Object>> weeklyData = usersService.getWeeklyCo2Emission(user_id);
        return ResponseEntity.ok(weeklyData);
    }

    @GetMapping("/monthly")
    public ResponseEntity<List<Map<String, Object>>> getMonthlyCo2Emission(@RequestParam Long user_id) {
        List<Map<String, Object>> monthlyData = usersService.getMonthlyCo2Emission(user_id);
        return ResponseEntity.ok(monthlyData);
    }

    @GetMapping("/daily/7days")
    public ResponseEntity<List<Map<String, Object>>> getDailyCo2EmissionLast7Days(@RequestParam Long user_id) {
        List<Map<String, Object>> dailyData = usersService.getDailyCo2EmissionLast7Days(user_id);
        return ResponseEntity.ok(dailyData);
    }

    @GetMapping("/daily/30days")
    public ResponseEntity<List<Map<String, Object>>> getDailyCo2EmissionLast30Days(@RequestParam Long user_id) {
        List<Map<String, Object>> dailyData = usersService.getDailyCo2EmissionLast30Days(user_id);
        return ResponseEntity.ok(dailyData);
    }

    @GetMapping("/daily/today")
    public ResponseEntity<Float> getCo2Today(@RequestParam Long user_id) {
        float co2Today = usersService.getCo2Today(user_id);
        return ResponseEntity.ok(co2Today);
    }

    @GetMapping("/daily/maxday")
    public ResponseEntity<EmissionDay> getCo2MaxDay(@RequestParam Long user_id) {
        EmissionDay co2MaxDay = usersService.getCo2MaxDay(user_id);
        return ResponseEntity.ok(co2MaxDay);
    }

    @GetMapping("/daily/minday")
    public ResponseEntity<EmissionDay> getCo2MinDay(@RequestParam Long user_id) {
        EmissionDay co2MinDay = usersService.getCo2MinDay(user_id);
        return ResponseEntity.ok(co2MinDay);
    }
}