package com.printf.DDING.repository;

import com.printf.DDING.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface IndexRepository extends JpaRepository<Menu,Integer> {
	@Query("SELECT m.menuName FROM Menu m WHERE m.menuDate = :menuDate")
	String findMenuNameByMenuDate(Date menuDate);

	@Query("SELECT count() FROM MenuLike m WHERE m.menuDate = :menuDate")
	String findMenuNameByMenuDate(Date menuDate);

	@Query("SELECT m.menuName FROM Menu m WHERE m.menuDate = :menuDate")
	String findMenuNameByMenuDate(Date menuDate);
}
