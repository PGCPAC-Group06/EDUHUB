package com.eduhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eduhub.entity.RevenueShare;

@Repository
public interface RevenueShareRepository extends JpaRepository<RevenueShare, Integer> {

}
