package com.learnsphere.progress.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ModuleProgress {
    private String moduleId;
    private boolean completed;
    private int progress;
    private LocalDateTime lastAccessDate;
    private LocalDateTime completionDate;
}