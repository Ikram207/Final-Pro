import React, { useState, useEffect } from "react";

export default function TaskFilter({ onFilterChange }) {
  // États pour les filtres et tri
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Déclenche la mise à jour des filtres vers le parent
  useEffect(() => {
    onFilterChange({
      status: statusFilter,
      search: searchTerm,
      sortField,
      sortOrder,
    });
  }, [statusFilter, searchTerm, sortField, sortOrder, onFilterChange]);

  return (
    <div
      style={{
        marginBottom: 20,
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {/* Filtre par statut */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{ padding: "6px" }}
      >
        <option value="">Tous les statuts</option>
        <option value="pending">En attente</option>
        <option value="in-progress">En cours</option>
        <option value="done">Terminé</option>
      </select>

      {/* Recherche texte */}
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "6px", flexGrow: 1, minWidth: 150 }}
      />

      {/* Tri par champ */}
      <select
        value={sortField}
        onChange={(e) => setSortField(e.target.value)}
        style={{ padding: "6px" }}
      >
        <option value="">Trier par</option>
        <option value="title">Titre</option>
        <option value="dueDate">Date limite</option>
        <option value="status">Statut</option>
      </select>

      {/* Tri asc/desc */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        style={{ padding: "6px" }}
        disabled={!sortField}
      >
        <option value="asc">Ascendant</option>
        <option value="desc">Descendant</option>
      </select>
    </div>
  );
}
