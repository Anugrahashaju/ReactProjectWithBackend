package com.learnsphere.training.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "courses")
public class Course {
    @Id
    private String id;
    
    private String title;
    private String description;
    private String trainerId;
    private List<Module> modules;
    private List<String> prerequisites;
    private int durationHours;
    private String category;
    private String level;
    private boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}