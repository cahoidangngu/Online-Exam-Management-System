package com.quanchun.backendexamsystem.security.repositories;

import com.quanchun.backendexamsystem.security.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByUsername(String username);

    @Query(value = "select a.* from account a join account_roles a_r on a.id = a_r.account_id " + "join role on role.id = a_r.roles_id where role.name = :role", nativeQuery = true)
    List<Account> findAllByRoleName(@Param("role") String roleName);

    Account findByEmail(String email);

    @Modifying
    @Query(value = "insert into user (account_id) values (?1)", nativeQuery = true)
    void addUser(Long idAcc);
}
