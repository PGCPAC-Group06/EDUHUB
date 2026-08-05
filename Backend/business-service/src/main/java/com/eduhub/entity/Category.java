package com.eduhub.entity;

<<<<<<< HEAD

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "category")
@Data
@NoArgsConstructor
@AllArgsConstructor
=======
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Set;

@Entity
@Table(name = "CATEGORY")
@Getter
@Setter
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Integer categoryId;

<<<<<<< HEAD
    @Column(name = "category_name", nullable = false, unique = true)
    private String categoryName;
}
=======
    @Column(name = "category_name", nullable = false, unique = true, length = 100)
    private String categoryName;
}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
