package com.learnsphere.training.service;

import com.learnsphere.training.model.Course;
import com.learnsphere.training.repository.CourseRepository;
import com.learnsphere.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    
    public Course getCourseById(String id) {
        return courseRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
    }
    
    public List<Course> getCoursesByTrainer(String trainerId) {
        return courseRepository.findByTrainerId(trainerId);
    }
    
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }
    
    public Course updateCourse(String id, Course course) {
        Course existingCourse = getCourseById(id);
        
        course.setId(existingCourse.getId());
        return courseRepository.save(course);
    }
    
    public void deleteCourse(String id) {
        Course course = getCourseById(id);
        courseRepository.delete(course);
    }
    
    public List<Course> getActiveCourses() {
        return courseRepository.findByIsActiveTrue();
    }
    
    public List<Course> getCoursesByCategory(String category) {
        return courseRepository.findByCategory(category);
    }
}