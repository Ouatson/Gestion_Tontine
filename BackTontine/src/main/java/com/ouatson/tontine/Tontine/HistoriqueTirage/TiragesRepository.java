package com.ouatson.tontine.Tontine.HistoriqueTirage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TiragesRepository extends JpaRepository<Tirages, Long> {
}
