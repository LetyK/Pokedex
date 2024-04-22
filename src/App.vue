<template>
  <v-app>
    <div class="background-image">
      <v-container>
        <v-container>
          <v-text-field v-model="search" label="Pesquisar" placeholder="Charmander" solo style="color: white !important;"></v-text-field>
          <v-row>
            <v-col cols="3" v-for="pokemon in filtered_pokemons" :key="pokemon.name">
              <v-card @click="show_pokemon(get_id(pokemon))">
                <v-container>
                  <v-row class="mx-0 d-flex justify-center">
                    <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${get_id(pokemon)}.png`" :alt="pokemon.name" width="80%">
                  </v-row>
                  <h2 class="text-center">{{ pokemon.name }}</h2>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- Vuetify usage -->
      <v-dialog v-model="show_dialog" max-width="800">
        <v-card v-if="selected_pokemon">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" color="surface-variant" text="Open Dialog" variant="flat"></v-btn>
          </template>
          <v-card title="Card">
            <v-container>
              <v-row class="d-flex align-center">
                <v-col cols=4>
                  <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selected_pokemon.id}.png`" :alt="selected_pokemon" width="80%">
                </v-col>
                <v-col cols=8>
                  <h1>{{ selected_pokemon.name }}</h1>
                  <v-chip color="green" v-for="type in selected_pokemon.types" :key="type.slot" class="mr-2">{{ type.type.name }}</v-chip>
                  <v-divider class="my-4"></v-divider>
                  <v-chip color="blue">Altura {{ selected_pokemon.height * 2.54 }} cm</v-chip>
                </v-col>
              </v-row>

              <v-chip>
                <h2 style="color: hotpink;">Moves</h2>
              </v-chip>

              <v-table>
                <template>
                  <thead>
                    <tr>
                      <th class="text-left">Level</th>
                      <th class="text-left">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                  </tbody>
                </template>
              </v-table>
              <v-card-text></v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Close" @click="show_dialog = false"></v-btn>
              </v-card-actions>
            </v-container>
          </v-card>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
//import { languagesOptions } from "/src/components/language.js";
import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      pokemons: [],
      search: "",
      show_dialog: false,
      selected_pokemon: null,
      moves: []

    };
  },
  mounted() {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=51&offset=0").then((response) => {
      this.pokemons = response.data.results;
    });
  },
  methods: {
    get_id(pokemon) {
      return Number(pokemon.url.split("/")[6]);
    },
    get_name(pokemon) {
      return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    },
    show_pokemon(id) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
        this.selected_pokemon = response.data;
        this.show_dialog = !this.show_dialog;
      });
    },
    filter_moves(pokemon) {
      return pokemon.moves.filter((item) => {
        let include =false;
        for(let version of item.version_group_details) {
          if(version.version_group.name == "sword-dance") {
            include = true;
          }
        }
        return include;
      });
    }
  },
  computed: {
    filtered_pokemons() {
      return this.pokemons.filter((item) => {
        return item.name.includes(this.search);
      });
    },
  },
};
</script>

<style>
.background-image {
  background-image: url('/src/assets/background.png');
  background-size: cover;
  background-repeat: no-repeat;
  height: 600vh;
  display: flex;
}
</style>