package com.ouatson.backtontine.Problemes.Impayes;

import com.ouatson.backtontine.Utilisateurs.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImpayesRepository extends JpaRepository<Impayes, Long> {
    List<Impayes> findAllByProprio(User user);
}
