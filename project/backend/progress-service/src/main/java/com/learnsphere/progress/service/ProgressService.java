package com.learnsphere.progress.service;

import com.learnsphere.progress.model.LearningProgress;
import com.learnsphere.progress.repository.LearningProgressRepository;
import com.learnsphere.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgressService {
    private final LearningProgressRepository progressRepository;
    
    public List<LearningProgress> getUserProgress(String userId) {
        return progressRepository.findByUserId(userId);
    }
    
    public LearningProgress getCourseProgress(String userId, String courseId) {
        return progressRepository.findByUserIdAndCourseId(userId, courseId)
            .orElseThrow(() -> new ResourceNotFoundException("Progress not found"));
    }
    
    public LearningProgress updateProgress(String userId, String courseId, String moduleId) {
        LearningProgress progress = getCourseProgress(userId, courseId);
        
        progress.getModuleProgress().stream()
            .filter(mp -> mp.getModuleId().equals(moduleId))
            .findFirst()
            .ifPresent(mp -> {
                mp.setCompleted(true);
                mp.setProgress(100);
                mp.setCompletionDate(LocalDateTime.now());
            });
        
        // Update overall progress
        int completedModules = (int) progress.getModuleProgress().stream()
            .filter(mp -> mp.isCompleted())
            .count();
        
        progress.setOverallProgress(
            (completedModules * 100) / progress.getModuleProgress().size()
        );
        
        if (progress.getOverallProgress() == 100) {
            progress.setStatus("COMPLETED");
            progress.setCompletionDate(LocalDateTime.now());
        }
        
        progress.setLastAccessDate(LocalDateTime.now());
        
        return progressRepository.save(progress);
    }
    
    public LearningProgress initializeProgress(LearningProgress progress) {
        progress.setStatus("NOT_STARTED");
        progress.setStartDate(LocalDateTime.now());
        progress.setLastAccessDate(LocalDateTime.now());
        progress.setOverallProgress(0);
        
        return progressRepository.save(progress);
    }
}