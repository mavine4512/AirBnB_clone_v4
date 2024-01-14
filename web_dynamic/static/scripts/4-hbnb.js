document.ready(function () {
	const amenities = {};
	$("li input[type=checkbox]").change(function () {
		const amenityId = $(this).data('id');
		const amenityName = $(this).data('name');

		if (this.checked) {
			amenities[amenityName] = amenityId;
		} else {
			delete amenities[amenityName];
		}
		$(".amenities h4").text(Object.values(amenities).join(", "));
	});

	$.getJSON("http://0.0.0.0:5001/api/v1/status/", (data) => {
		if (data.status === "OK") {
			$("div#api_status").addClass("available");
		} else {
			$("div#api_status").removeClass("available");
		}
	});

	$.post({
		url: 'http://0.0.0.0:5001/api/v1/places_search',
		data: JSON.stringify({}),
		headers: {
			"Content-Type: application/json",
		},
		success: (data) => {
			data.forEach((place) =>
				$("section.places").append(
					`<article>
			<div class="title_box">
			<h2>${place.name}</h2>
			<div class="price_by_night">$${place.price_by_night}</div>
			</div>
			<div class="information">
			<div class="max_guest">${place.max_guest} Guest${
						place.max_guest !== 1 ? "s" : ""
					}</div>
			<div class="number_rooms">${place.number_rooms} Bedroom${
						place.number_rooms !== 1 ? "s" : ""
					}</div>
			<div class="number_bathrooms">${place.number_bathrooms} Bathroom${
						place.number_bathrooms !== 1 ? "s" : ""
					}</div>
			</div>
			<div class="description">
			${place.description}
			</div>
				</article>`
				)
			);
		},
		dataType: "json",
	});

	$(".filters button").bind("click", searchPlace);
	searchPlace();
});
