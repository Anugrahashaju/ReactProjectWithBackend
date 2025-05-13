package com.learnsphere.training.model;

import lombok.Data;
import java.util.List;

@Data
public class Module {
    private String id;
    private String title;
    private String description;
    private String content;
    private List<Resource> resources;
    private int order;
    private int durationMinutes;
}