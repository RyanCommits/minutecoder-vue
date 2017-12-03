<template>
  <div id="coder">
    <!-- DOM renders only if code is received from server -->
    <div v-if="codeFromServer">
      <h2>{{language}} Snippet # {{codeId}}</h2>
      <pre v-highlightjs><code ref="code"><span class="code untouched" v-for="char in codeFromServer.code">{{ char }}</span></code></pre>
    </div>
  </div>
</template>

<script>
  import store from 'store';
  import timer from './timer.vue';

  import * as codeState from 'store/code/state/const';
  import * as codeGetters from 'store/code/getters/const';
  import * as codeMutations from 'store/code/mutations/const';
  import * as codeActions from 'store/code/actions/const';
  import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

  export default {
    components: {
      timer
    },
    data() {
      return {
        index: 0,
        nodes: []
        // code: null
      };
    },
    computed: {
      ...mapState('code', {
        language: codeState.language,
        codeId: codeState.codeId
      }),
      ...mapGetters('code', {
        codeFromServer: codeGetters.code,
        started: codeGetters.getStatus
      })
    },
    methods: {
      ...mapMutations('code', {
        start: codeMutations.START,
        stop: codeMutations.STOP
      }),
      ...mapActions('code', {
        getCode: codeActions.getCode,
      }),
      isMatch(node, key) {
        // if no nested span
        if (node.children.length && node.children[0].innerHTML === key ) {
          return true;
        // if nested span
        } else if (!node.children.length && node.innerHTML === key) {
          return true;
        } else if  (node.childNodes && node.innerText === key) {
          return true;
        }

        return false;
      },
      isEnterKey(node, key) {
        if (key === 'Enter' && node.innerHTML === '\n') {
          return true;
        }
      },
      indent() {
        let currentNode = this.nodes[this.index]
        while (currentNode.innerHTML === ' ') {
          this.index++;
          currentNode = this.nodes[this.index]
        }
      }
    },
    watch: {
      index(newVal, oldVal) {
        if (newVal !== oldVal) {
          const previousNode = this.nodes[oldVal];
          const currentNode = this.nodes[newVal];

          // UI class actions
          ///////////////////

          currentNode.classList.add('active');
          previousNode.classList.remove('incorrect');
          previousNode.classList.remove('active');
          previousNode.classList.remove('untouched');

          /////////////////////////////

          if (this.nodes[newVal].innerHTML === '\n') {
            this.nodes[this.index].classList.add('return');
          }
        }
      }
    },
    mounted() {

      this.getCode(this.language.toLowerCase());

      setTimeout(() => {
        // creates an array of hljs DOM spans. They are by reference

        this.nodes = Array.prototype.slice.call(this.$refs.code.children);

        // add the active class to first character

        this.nodes[0].classList.add('active');

        // handle User typing

        window.addEventListener('keypress', (event) => {
          const key = event.key;
          const currentNode = this.nodes[this.index];

          this.start();

          // stop space bar from scrolling page
          if (key === ' ') {
            event.preventDefault();
          }

          // when user completes challenge
          /////////////////////////////////////////
          if (this.index === this.nodes.length - 1) {
            this.stop();
            currentNode.classList.remove('active');
            currentNode.classList.remove('untouched');

          /////////////////////////////////////////

          } else if (this.isMatch(currentNode, key)) {
            this.index++;
          } else if (this.isEnterKey(currentNode, key)) {
            currentNode.classList.remove('return');
            this.index++;
            currentNode.classList.add('active');
            // indent tabbed spaces after line break
            this.indent();
          } else {
            currentNode.classList.add('incorrect');
          }
          return;
        });
      }, 2000);
    },
    beforeDestroy() {
      this.stop();
    }
  }
</script>

<style lang="sass">
  @import '~assets/highlight/solarized-dark.css';

  #coder h3 {
    color: #000;
    margin-bottom: 20px;
  }

  .hljs {
    text-align: left;
    display: block;
    overflow-x: auto;
    padding: 20px;
    background: #002b36;
    color: #839496;
    min-height: 390px;
    width: 80%;
    margin-bottom: 20px;
    margin-right: auto;
    margin-left: auto;
  }

  .untouched {
    color: grey;

    span[class^="hljs"] {
      color: grey !important;
    }
  }
  .code {
    font-size: 14px;
  }
  .active {
    color: white;
    background-color: #b58900;

    span[class^="hljs"] {
      color: white !important;
    }
  }
  .return:before {
    content: '\23CE';
    color: #fdf6e3;
    padding: .1em .4em;
    font-weight: bold;
  }
  .incorrect {
    color: white;
    background-color: red;

    span[class^="hljs"] {
      color: white !important;
    }
  }
</style>
