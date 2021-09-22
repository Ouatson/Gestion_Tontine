package com.ouatson.backtontine.Problemes.Vols;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.ouatson.backtontine.Participants.Participant;
import com.ouatson.backtontine.Utilisateurs.User;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
public class Vols implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private Long tontineId;
    private String tontineNom;
    private String lieu;
    private LocalDate date;
    private String description;
    @ManyToOne
    private User owner;
    @OneToMany
    private Collection<Participant> concernes;

    public Vols() {
    }

    public Vols(Long id, Long tontineId, String tontineNom, String lieu, LocalDate date, String description, User owner, Collection<Participant> concernes) {
        this.id = id;
        this.tontineId = tontineId;
        this.tontineNom = tontineNom;
        this.lieu = lieu;
        this.date = date;
        this.description = description;
        this.owner = owner;
        this.concernes = concernes;
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

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Collection<Participant> getConcernes() {
        return concernes;
    }

    public void setConcernes(Collection<Participant> concernes) {
        this.concernes = concernes;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    @Override
    public String toString() {
        return "Vols{" +
                "id=" + id +
                ", tontineId=" + tontineId +
                ", tontineNom='" + tontineNom + '\'' +
                ", lieu='" + lieu + '\'' +
                ", date=" + date +
                ", description='" + description + '\'' +
                ", owner=" + owner +
                ", concernes=" + concernes +
                '}';
    }
}
