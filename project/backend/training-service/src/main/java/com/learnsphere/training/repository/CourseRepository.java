package com.learnsphere.training.repository;

import com.learnsphere.training.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> findByTrainerId(String trainerId);
    List<Course> findByCategory(String category);
    List<Course> findByIsActiveTrue();
}