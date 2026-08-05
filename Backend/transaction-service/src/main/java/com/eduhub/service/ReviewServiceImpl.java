package com.eduhub.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eduhub.dto.AddReviewRequest;
import com.eduhub.dto.ReviewResponse;
import com.eduhub.entity.Enrollment;
import com.eduhub.entity.Review;
import com.eduhub.repository.EnrollmentRepository;
import com.eduhub.repository.ReviewRepository;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Override
    public ReviewResponse addReview(
            Integer userId,
            AddReviewRequest request) {

        Enrollment enrollment = enrollmentRepository
                .findById(request.getEnrollmentId())
                .orElseThrow(() ->
                        new RuntimeException("Enrollment not found."));

        if (userId != null && !enrollment.getStudentUserId().equals(userId)) {
            throw new RuntimeException("You are not authorized.");
        }

        Review review = reviewRepository.findByEnrollmentId(request.getEnrollmentId()).orElse(null);
        if (review == null) {
            review = new Review();
            review.setEnrollmentId(request.getEnrollmentId());
        }
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        Review savedReview = reviewRepository.save(review);

        ReviewResponse response = new ReviewResponse();
        BeanUtils.copyProperties(savedReview, response);
        return response;
    }
    @Override
    public ReviewResponse getReviewById(
            Integer reviewId) {

        Review review = reviewRepository
                .findById(reviewId)
                .orElseThrow(() ->
                        new RuntimeException("Review not found."));

        ReviewResponse response =
                new ReviewResponse();

        BeanUtils.copyProperties(review, response);

        return response;
    }

    @Override
    public List<ReviewResponse> getReviewsByEnrollment(
            Integer enrollmentId) {

        List<Review> reviews =
                reviewRepository.findAllByEnrollmentId(
                        enrollmentId);

        return reviews.stream().map(review -> {

            ReviewResponse response =
                    new ReviewResponse();

            BeanUtils.copyProperties(review, response);

            return response;

        }).collect(Collectors.toList());
    }

    @Override
    public void deleteReview(
            Integer userId,
            Integer reviewId) {

        Review review = reviewRepository
                .findById(reviewId)
                .orElseThrow(() ->
                        new RuntimeException("Review not found."));

        Enrollment enrollment = enrollmentRepository
                .findById(review.getEnrollmentId())
                .orElseThrow(() ->
                        new RuntimeException("Enrollment not found."));

        if (!enrollment.getStudentUserId().equals(userId)) {

            throw new RuntimeException(
                    "You are not authorized.");
        }

        reviewRepository.delete(review);
    }

    @Override
    public List<ReviewResponse> getAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        return reviews.stream().map(review -> {
            ReviewResponse response = new ReviewResponse();
            BeanUtils.copyProperties(review, response);
            return response;
        }).collect(Collectors.toList());
    }

    @Override
    public Double getAverageRating() {
        List<Review> reviews = reviewRepository.findAll();
        if (reviews.isEmpty()) {
            return 0.0;
        }
        double sum = 0;
        for(Review r : reviews) {
            sum += r.getRating() != null ? r.getRating() : 0;
        }
        return sum / reviews.size();
    }
}
