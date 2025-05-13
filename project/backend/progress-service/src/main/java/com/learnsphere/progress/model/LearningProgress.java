package com.learnsphere.progress.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "learning_progress")
public class LearningProgress {
    @Id
    private String id;
    
    private String userId;
    private String courseId;
    private List<ModuleProgress> moduleProgress;
    private int overallProgress;
    private String status; // NOT_STARTED, IN_PROGRESS, COMPLETED
    private LocalDateTime startDate;
    private LocalDateTime lastAccessDate;
    private LocalDateTime completionDate;
}