import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from './colors';
import InicioScreen from './InicioScreen';
import CalendarioScreen from './CalendarioScreen';
import TemporizadorScreen from './TemporizadorScreen';
import MinijuegoScreen from './MinijuegoScreen';
import TipsPadresScreen from './TipsPadresScreen';

// Identificadores simples para navegar entre pantallas sin librerías externas.
const RUTAS = {
  INICIO: 'Inicio',
  CALENDARIO: 'Calendario',
  TEMPORIZADOR: 'Temporizador',
  MINIJUEGO: 'Minijuego',
  TIPS: 'TipsPadres',
};

const App = () => {
  // Estado global de navegación de la app.
  const [rutaActiva, setRutaActiva] = useState(RUTAS.INICIO);

  // Renderiza la pantalla correspondiente según la ruta actual.
  const pantallaActiva = useMemo(() => {
    if (rutaActiva === RUTAS.CALENDARIO) return <CalendarioScreen />;
    if (rutaActiva === RUTAS.TEMPORIZADOR) return <TemporizadorScreen />;
    if (rutaActiva === RUTAS.MINIJUEGO) return <MinijuegoScreen />;
    if (rutaActiva === RUTAS.TIPS) return <TipsPadresScreen />;

    return (
      <InicioScreen
        onPressCepillarAhora={() => setRutaActiva(RUTAS.TEMPORIZADOR)}
        onPressMisiones={() => setRutaActiva(RUTAS.MINIJUEGO)}
        onPressCalendario={() => setRutaActiva(RUTAS.CALENDARIO)}
        onPressRecompensas={() => setRutaActiva(RUTAS.TIPS)}
      />
    );
  }, [rutaActiva]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Contenido principal de la pantalla seleccionada */}
      <View style={styles.screenContainer}>{pantallaActiva}</View>

      {/* Barra inferior simple para conectar toda la app en un solo flujo */}
      <View style={styles.bottomBar}>
        <NavItem etiqueta="Inicio" activa={rutaActiva === RUTAS.INICIO} onPress={() => setRutaActiva(RUTAS.INICIO)} />
        <NavItem etiqueta="Calendario" activa={rutaActiva === RUTAS.CALENDARIO} onPress={() => setRutaActiva(RUTAS.CALENDARIO)} />
        <NavItem etiqueta="Timer" activa={rutaActiva === RUTAS.TEMPORIZADOR} onPress={() => setRutaActiva(RUTAS.TEMPORIZADOR)} />
        <NavItem etiqueta="Juego" activa={rutaActiva === RUTAS.MINIJUEGO} onPress={() => setRutaActiva(RUTAS.MINIJUEGO)} />
      </View>
    </SafeAreaView>
  );
};

// Botón reutilizable de la barra inferior.
const NavItem = ({ etiqueta, activa, onPress }) => (
  <TouchableOpacity
    style={[styles.navItem, activa ? styles.navItemActive : styles.navItemInactive]}
    activeOpacity={0.9}
    onPress={onPress}
  >
    <Text style={[styles.navText, activa && styles.navTextActive]}>{etiqueta}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenContainer: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E3ECF4',
    backgroundColor: '#FFFFFF',
  },
  navItem: {
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    minWidth: 78,
    alignItems: 'center',
  },
  navItemActive: {
    backgroundColor: Colors.primary,
  },
  navItemInactive: {
    backgroundColor: '#F0F5FA',
  },
  navText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5A5A5A',
  },
  navTextActive: {
    color: '#11374F',
  },
});

export default App;
