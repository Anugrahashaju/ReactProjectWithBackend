package com.learnsphere.progress.controller;

import com.learnsphere.progress.model.LearningProgress;
import com.learnsphere.progress.service.ProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class ProgressController {
    private final ProgressService progressService;
    
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR', 'LND') or #userId == authentication.principal.id")
    public ResponseEntity<List<LearningProgress>> getUserProgress(@PathVariable String userId) {
        return ResponseEntity.ok(progressService.getUserProgress(userId));
    }
    
    @GetMapping("/user/{userId}/course/{courseId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR', 'LND') or #userId == authentication.principal.id")
    public ResponseEntity<LearningProgress> getCourseProgress(
        @PathVariable String userId,
        @PathVariable String courseId
    ) {
        return ResponseEntity.ok(progressService.getCourseProgress(userId, courseId));
    }
    
    @PostMapping("/initialize")
    public ResponseEntity<LearningProgress> initializeProgress(
        @RequestBody LearningProgress progress
    ) {
        return ResponseEntity.ok(progressService.initializeProgress(progress));
    }
    
    @PutMapping("/user/{userId}/course/{courseId}/module/{moduleId}")
    @PreAuthorize("#userId == authentication.principal.id")
    public ResponseEntity<LearningProgress> updateModuleProgress(
        @PathVariable String userId,
        @PathVariable String courseId,
        @PathVariable String moduleId
    ) {
        return ResponseEntity.ok(progressService.updateProgress(userId, courseId, moduleId));
    }
}