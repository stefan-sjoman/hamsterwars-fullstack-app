import { atom } from 'recoil';

const allHamsters = atom({
	key: 'allHamsters',
	default: [
		{"imgName":"hamster-35.jpg","games":25,"favFood":"ananas","wins":5,"defeats":17,"age":3,"loves":"bli klappad","name":"Alma","firestoreId":"0S4wKVHGdkWKIpygFz9Y"}
	]
});

export default allHamsters