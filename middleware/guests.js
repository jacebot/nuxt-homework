export default function({ store, redirect }) {
  console.log('i foed')
  if (store.state.auth.loggedIn) {
    return redirect('/')
  }
}
