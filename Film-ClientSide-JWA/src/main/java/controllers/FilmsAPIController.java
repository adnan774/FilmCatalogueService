package controllers;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import database.FilmDAO;
import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.JAXBException;
import jakarta.xml.bind.Marshaller;
import jakarta.xml.bind.Unmarshaller;
import models.Film;
import models.FilmList;

/**
 * Servlet implementation class FilmsAPIController
 */
@WebServlet("/FilmsAPIController")
public class FilmsAPIController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public FilmsAPIController() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		FilmDAO dao = new FilmDAO();
		
		ArrayList<Film> films = new ArrayList<>();
		//collect search data from the form
		String option = request.getParameter("search-type");
		String searchStr = request.getParameter("search-input");
		
		if (request.getParameterMap().containsKey("search-type") && searchStr != null) {
			System.out.println("search.....");
			films = dao.searchFilms(option, searchStr);
	
		} else {
			films = dao.getAllFilms();
		}
		

		PrintWriter pw = response.getWriter();
		//Server to client

		String format = request.getHeader("Accept");
		System.out.println(format);
		
			
			if ("application/json".equals(format)) {

				response.setContentType("application/json");
				Gson gson = new Gson();
				String json = gson.toJson(films);
				pw.write(json);
				pw.close();
			} else if ("application/xml".equals(format)) {

				response.setContentType("application/xml");
				FilmList f1 = new FilmList(films);
				StringWriter sw = new StringWriter();
				PrintWriter pw1 = response.getWriter();
				JAXBContext jaxbContext;

				try {
					jaxbContext = JAXBContext.newInstance(FilmList.class);
					Marshaller marshaller = jaxbContext.createMarshaller();
					marshaller.setProperty(marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
					marshaller.marshal(f1, pw1);
					//marshaller.marshal(f2, pw1);
					pw.write(sw.toString());
					pw.close();
					System.out.println(pw1.toString());

				} catch (JAXBException e) {
					e.printStackTrace();
				}
			} else {

				response.setContentType("text/plain");
				String str = "";
				for (Film f : films) {
					str = str + f.splitValues();
				}
				pw.write(str);
				pw.close();
				String plain = films.toString();
				pw.write(plain);
			}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String data = request.getReader().lines().reduce("", (accumulator, actual) -> accumulator + actual);
		System.out.println(data);
		FilmDAO dao = new FilmDAO();

		String dataFormat = request.getHeader("Content-Type");
		if ("application/xml".equals(dataFormat)) {

			JAXBContext jaxbContext1;
			PrintWriter pw = response.getWriter();

			try {
				jaxbContext1 = JAXBContext.newInstance(Film.class);
				Unmarshaller jaxbUnmarshaller = jaxbContext1.createUnmarshaller();
				Film f = (Film) jaxbUnmarshaller.unmarshal(new StringReader(data));
				dao.insertFilm(f);
				pw.write("film inserted");

			} catch (JAXBException | SQLException e1) {
				e1.printStackTrace();
			}
			pw.close();

		} else if ("application/json".equals(dataFormat)) {

			PrintWriter pw = response.getWriter();
			Gson gson = new Gson();
			Film f = gson.fromJson(data, Film.class);
			try {
				dao.insertFilm(f);
				pw.write("film inserted");
			} catch (SQLException e) {
				e.printStackTrace();
			}

		} else {

			response.setContentType("text/plain");
			PrintWriter pw = response.getWriter();
			Film f = new Film();
			String[] value = data.split("#");

			for (int i = 0; i < value.length; i++) {
				System.out.println(i + ": " + value[i]);
			}

			f.setTitle(value[0]);
			f.setYear(Integer.valueOf(value[1]));
			f.setDirector(value[2]);
			f.setStars(value[3]);
			f.setReview(value[4]);

			try {
				dao.insertFilm(f);
				pw.write("film inserted");
			} catch (SQLException e) {
				e.printStackTrace();
			}
			pw.close();

		}
	}

	@Override
	protected void doPut(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String data = request.getReader().lines().reduce("", (accumulator, actual) -> accumulator + actual);
		System.out.println(data);
		FilmDAO dao = new FilmDAO();

		String dataFormat = request.getHeader("Content-Type");
		if ("application/xml".equals(dataFormat)) {

			JAXBContext jaxbContext1;
			PrintWriter pw = response.getWriter();

			try {
				jaxbContext1 = JAXBContext.newInstance(Film.class);
				Unmarshaller jaxbUnmarshaller = jaxbContext1.createUnmarshaller();
				Film f = (Film) jaxbUnmarshaller.unmarshal(new StringReader(data));
				dao.updateFilm(f);
				pw.write("film updated");

			} catch (JAXBException | SQLException e1) {
				e1.printStackTrace();
			}
			pw.close();

		} else if ("application/json".equals(dataFormat)) {

			PrintWriter pw = response.getWriter();
			Gson gson = new Gson();
			Film f = gson.fromJson(data, Film.class);
			try {
				dao.updateFilm(f);
			} catch (SQLException e) {
				e.printStackTrace();
			}
			pw.write("film updated");
		} else {

			response.setContentType("text/plain");
			PrintWriter pw = response.getWriter();
			Film f = new Film();
			String[] value = data.split("#");
			f.setId(Integer.valueOf(value[0]));
			f.setTitle(value[1]);
			f.setYear(Integer.valueOf(value[2]));
			f.setDirector(value[3]);
			f.setStars(value[4]);
			f.setReview(value[5]);

			try {
				dao.updateFilm(f);
				pw.write("film updated");
			} catch (SQLException e) {
				e.printStackTrace();
			}
			pw.close();
		}
	}

	@Override
	protected void doDelete(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String data = request.getReader().lines().reduce("", (accumulator, actual) -> accumulator + actual);
		System.out.println(data);
		FilmDAO dao = new FilmDAO();

		String dataFormat = request.getHeader("Content-Type");
		if ("application/xml".equals(dataFormat)) {
			JAXBContext jaxbContext1;
			PrintWriter pw = response.getWriter();

			try {
				jaxbContext1 = JAXBContext.newInstance(Film.class);
				Unmarshaller jaxbUnmarshaller = jaxbContext1.createUnmarshaller();
				Film f = (Film) jaxbUnmarshaller.unmarshal(new StringReader(data));
				dao.deleteFilm(f.getId());
				pw.write("film deleted");

			} catch (JAXBException | SQLException e1) {
				e1.printStackTrace();
			}
			pw.close();

		} else if ("application/json".equals(dataFormat)) {

			PrintWriter pw = response.getWriter();
			Gson gson = new Gson();
			Film f = gson.fromJson(data, Film.class);
			try {
				dao.deleteFilm(f.getId());
			} catch (SQLException e) {
				e.printStackTrace();
			}
			pw.write("film deleted");
		} else {

			response.setContentType("text/plain");
			PrintWriter pw = response.getWriter();
			Film f = new Film();
			String[] value = data.split("#");
			f.setId(Integer.valueOf(value[0]));

			try {
				dao.deleteFilm(f.getId());
				pw.write("film deleted");
			} catch (SQLException e) {
				e.printStackTrace();
			}
			pw.close();
		}
	}

}
