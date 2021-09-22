package com.ouatson.backtontine.Problemes.Impayes;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.ouatson.backtontine.Utilisateurs.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Impayes implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private Long tontineId;
    private String tontineNom;
    private String operateur;
    private String description;
    private Date dateDeposition;
    @ManyToOne
    private User proprio;

    public Impayes() {
    }

    public Impayes(Long id, Long tontineId, String tontineNom, String operateur, String description, Date dateDeposition, User proprio) {
        this.id = id;
        this.tontineId = tontineId;
        this.tontineNom = tontineNom;
        this.operateur = operateur;
        this.description = description;
        this.dateDeposition = dateDeposition;
        this.proprio = proprio;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTontineId() {
        return tontineId;
    }

    public void setTontineId(Long tontineId) {
        this.tontineId = tontineId;
    }

    public String getTontineNom() {
        return tontineNom;
    }

    public void setTontineNom(String tontineNom) {
        this.tontineNom = tontineNom;
    }

    public String getOperateur() {
        return operateur;
    }

    public void setOperateur(String operateur) {
        this.operateur = operateur;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDateDeposition() { return dateDeposition; }

    public void setDateDeposition(Date dateDeposition) { this.dateDeposition = dateDeposition; }

    public User getProprio() {
        return proprio;
    }

    public void setProprio(User proprio) {
        this.proprio = proprio;
    }

    @Override
    public String toString() {
        return "Impayes{" +
                "id=" + id +
                ", tontineId=" + tontineId +
                ", tontineNom='" + tontineNom + '\'' +
                ", operateur='" + operateur + '\'' +
                ", description='" + description + '\'' +
                ", dateDeposition=" + dateDeposition +
                ", proprio=" + proprio +
                '}';
    }
}
