/*
    Copyright (c) 2016 eyeOS

    This file is part of Open365.

    Open365 is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

var sinon = require('sinon');
var assert = require('chai').assert;
var eyeosBind = require('../lib/eyeosBind');

suite('eyeosBind', function(){
	var sut;

	var spyFunction;
	var objectToBind = {
		someProp: 'bar'
	};
	var args = [{foo: "bar"}, 2, 'three', function(){}];

	setup(function(){
		spyFunction = sinon.spy();
		sut = eyeosBind;
	});

	suite('#binds', function(){
		test('Should return a function', function(){
			var func = sut.bind(objectToBind, spyFunction);
			assert.isFunction(func);
		});
		test('Returned function should call our spy with same arguments', function () {
			var func = sut.bind(objectToBind, spyFunction);
			func(args[0], args[1], args[2], args[3]);
			spyFunction.withArgs(args[0], args[1], args[2], args[3]);
		});
		test('our functionToBind should have the correct context (objectToBind)', function () {
			var func = sut.bind(objectToBind, spyFunction);
			func(args[0], args[1], args[2], args[3]);
			spyFunction.calledOn(objectToBind);
		});
	});
});