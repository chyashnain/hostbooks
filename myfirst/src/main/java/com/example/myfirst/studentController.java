package com.example.myfirst;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/students")
public class studentController {
	@Autowired
	private studentService ds;

	public studentController(studentService ds) {
		this.ds = ds;
	}

	@PostMapping("/addstudent")
	public student addstudent(@RequestBody student student) {
		return ds.savestudent(student);
	}

	@GetMapping("/students")
	public List<student> findAllstudents() {
		return ds.getstudents();
	}

	@PutMapping("/updatestudent/{id}")
	public student updateStudentById(@PathVariable int id, @RequestBody student student) {
		student existingStudent = ds.getstudentById(id);

		if (existingStudent != null) {
			existingStudent.setName(student.getName()); // Update other fields as needed
			existingStudent.setEmail(student.getEmail());
			existingStudent.setPassword(student.getPassword());
			// Update other fields

			return ds.savestudent(existingStudent);
		}

		return null; // Handle not found scenario
	}

	@DeleteMapping("/delete/{id}")
	public String deletestudentById(@PathVariable int id) {
		return ds.deletestudent(id);
	}

}