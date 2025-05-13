package com.learnsphere.progress.repository;

import com.learnsphere.progress.model.LearningProgress;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface LearningProgressRepository extends MongoRepository<LearningProgress, String> {
    List<LearningProgress> findByUserId(String userId);
    Optional<LearningProgress> findByUserIdAndCourseId(String userId, String courseId);
    List<LearningProgress> findByStatus(String status);
}