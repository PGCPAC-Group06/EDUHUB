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
<<<<<<< HEAD

    List<ReviewResponse> getAllReviews();

    Double getAverageRating();
=======
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
}