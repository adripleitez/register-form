import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			registros: [],
		};
	}

	addEvents = (value) => {
		this.state.registros.push(value)
		this.setState({ registros: this.state.registros })
		console.log(this.state.registros)
	}

	updateRegistry = (value) => {
		this.setState({ registros: value })
	}

	render() {
		return (
			<div className="container">
				<div className="jumbotron">
					<Formu
						addEvents={this.addEvents}
					/>
				</div>

				<section>
					<Table
						registros={this.state.registros}
						updateRegistry={this.updateRegistry}
					/>
				</section>
			</div>
		);
	}
}

class Formu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			carnet: '',
			schedule: 'Lunes de 9:00 a 11:00',
			isLate: false,
			checked: false,
		};
	}

	changeHandler = (evt) => {
		// console.log(evt.target.value)
		this.setState({ [evt.target.name]: evt.target.value })
	}

	changeCheckHandler = () => {
		this.setState({ isLate: !this.state.isLate })
	}

	handleRegistry = () => {
		var date = new Date();
		var late = this.state.isLate ? "Tarde" : "A tiempo";

		let registry = { carnet: this.state.carnet, schedule: this.state.schedule, late: late, date: date }
		this.props.addEvents(registry)
	}

	render() {

		return (
			<div className="jumbotron">
				<h1>Registro de laboratorio.</h1>

				<div className="form-group">
					<label htmlFor="carnet" className="col-sm-2 col-form-label">
						Ingrese el carnet:{' '}
					</label>
					<input
						className="form-control"
						type="text"
						name="carnet"
						onChange={this.changeHandler}
						maxLength="8"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="schedule">Seleccione el horario:</label>
					<select name="schedule" className="form-control" onChange={this.changeHandler} >
						<option value="L">Lunes de 9:00 a 11.00</option>
						<option value="Ma">Martes de 13:30 a 15:30</option>
						<option value="Mi">Miércoles de 9:00 a 11.00</option>
						<option value="J">Jueves de 13:30 a 15:30</option>
						<option value="V1">Viernes de 9:00 a 11.00</option>
						<option value="V2">Viernes de 15:30 a 17:30</option>
					</select>
				</div>

				<div className="form-group">

					<Form.Switch
						type="switch"
						id="custom-switch"
						label="Llegó tarde?"
						onChange={this.changeCheckHandler}
					/>

				</div>

				<div className="form-group">
					<button type="button" className="btn btn-danger" onClick={this.handleRegistry} >
						Ingresar
					</button>
				</div>
			</div>
		);
	}
}


class Table extends React.Component {

	handleDelete = (id) => {
		let reg = this.props.registros;
		reg.splice(id, 1)
		this.props.updateRegistry(reg)
	}

	render() {
		return (
			<table className="table table-hover">
				<thead>
					<tr className="table-dark">
						<th scope="col">Carnet</th>
						<th scope="col">Horario de laboratorio</th>
						<th scope="col">Hora de ingreso</th>
						<th scope="col">Tarde?</th>
						<th scope="col">Eliminar</th>
					</tr>
				</thead>
				<tbody id="table_body">
					{
						this.props.registros.map(
							(r, index) => (
								<tr key={index} className="active">
									<td><b>{r.carnet}</b></td>
									<td>{r.schedule}</td>
									<td>{r.date.toLocaleString()}</td>
									<td>{r.late}</td>
									<td><button className="btn btn-danger" onClick={() => this.handleDelete(index)}>Eliminar</button></td>
								</tr>
							)
						)}
				</tbody>
			</table>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));