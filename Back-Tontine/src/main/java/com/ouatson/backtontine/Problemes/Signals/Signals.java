package com.ouatson.backtontine.Problemes.Signals;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.ouatson.backtontine.Utilisateurs.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Signals implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String objet;
    private String description;
    private Date dateDeposition;
    @ManyToOne
    private User utilisateur;

    public Signals() {
    }

    public Signals(Long id, String objet, String description, Date dateDeposition, User utilisateur) {
        this.id = id;
        this.objet = objet;
        this.description = description;
        this.dateDeposition = dateDeposition;
        this.utilisateur = utilisateur;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getObjet() {
        return objet;
    }

    public void setObjet(String objet) {
        this.objet = objet;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDateDeposition() { return dateDeposition; }

    public void setDateDeposition(Date dateDeposition) { this.dateDeposition = dateDeposition; }

    public User getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(User utilisateur) {
        this.utilisateur = utilisateur;
    }

    @Override
    public String toString() {
        return "Signals{" +
                "id=" + id +
                ", objet='" + objet + '\'' +
                ", description='" + description + '\'' +
                ", dateDeposition=" + dateDeposition +
                ", utilisateur=" + utilisateur +
                '}';
    }
}