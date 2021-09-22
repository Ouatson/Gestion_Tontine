package com.ouatson.backtontine.Tontine;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TontineRepository extends JpaRepository<Tontine, Long> {
    Optional<Tontine> findByCode(String code);
}
