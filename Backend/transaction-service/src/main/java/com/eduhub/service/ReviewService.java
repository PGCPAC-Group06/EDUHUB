package com.eduhub.service;


import java.util.List;

import com.eduhub.dto.AddReviewRequest;
import com.eduhub.dto.ReviewResponse;

public interface ReviewService {

    ReviewResponse addReview(
            Integer userId,
            AddReviewRequest request);

    ReviewResponse getReviewById(
            Integer reviewId);

    List<ReviewResponse> getReviewsByEnrollment(
            Integer enrollmentId);

    void deleteReview(
            Integer userId,
            Integer reviewId);
}