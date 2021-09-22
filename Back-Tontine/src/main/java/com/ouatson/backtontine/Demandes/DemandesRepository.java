package com.ouatson.backtontine.Demandes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DemandesRepository extends JpaRepository<Demandes, Long> {
    List<Demandes> findAllByEmail(String email);

    Demandes findByEmail(String email);
}
