package com.learnsphere.training.model;

import lombok.Data;

@Data
public class Resource {
    private String id;
    private String title;
    private String type;
    private String url;
    private String description;
}