import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from './colors';

// Banco de alimentos para el minijuego.
// saludable=true suma puntos, saludable=false resta puntos.
const ALIMENTOS = [
  { id: 1, nombre: '🍎 Manzana', saludable: true },
  { id: 2, nombre: '🥕 Zanahoria', saludable: true },
  { id: 3, nombre: '🧀 Queso', saludable: true },
  { id: 4, nombre: '🍬 Caramelo', saludable: false },
  { id: 5, nombre: '🍩 Dona', saludable: false },
  { id: 6, nombre: '🧃 Jugo natural', saludable: true },
  { id: 7, nombre: '🍫 Chocolate', saludable: false },
  { id: 8, nombre: '🥦 Brócoli', saludable: true },
];

const MinijuegoScreen = () => {
  // Puntaje acumulado del niño en la partida actual.
  const [puntaje, setPuntaje] = useState(0);

  // Mensaje de retroalimentación inmediata después de cada toque.
  const [mensaje, setMensaje] = useState('¡Toca alimentos saludables y evita dulces!');

  // Guarda los ids tocados para desactivar botones y evitar dobles puntos.
  const [tocados, setTocados] = useState([]);

  // Calcula cuántos alimentos saludables hay para mostrar objetivo divertido.
  const objetivoSaludables = useMemo(
    () => ALIMENTOS.filter((item) => item.saludable).length,
    [],
  );

  // Maneja la interacción del niño al tocar un alimento.
  const manejarToqueAlimento = (alimento) => {
    if (tocados.includes(alimento.id)) return;

    setTocados((previo) => [...previo, alimento.id]);

    if (alimento.saludable) {
      setPuntaje((anterior) => anterior + 10);
      setMensaje(`¡Muy bien! ${alimento.nombre} ayuda a tus dientes. ⭐`);
    } else {
      setPuntaje((anterior) => Math.max(0, anterior - 5));
      setMensaje(`Ups, ${alimento.nombre} es dulce. ¡Mejor elige saludable!`);
    }
  };

  // Reinicia la partida para volver a jugar.
  const reiniciarJuego = () => {
    setPuntaje(0);
    setMensaje('¡Nueva ronda! Encuentra los alimentos saludables.');
    setTocados([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado infantil del minijuego */}
      <View style={styles.headerCard}>
        <Text style={styles.title}>Mini juego: Dientes Felices 😄</Text>
        <Text style={styles.subtitle}>Toca lo saludable y evita los dulces.</Text>
      </View>

      {/* Tarjeta de puntaje grande y visible */}
      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Puntaje</Text>
        <Text style={styles.scoreValue}>{puntaje}</Text>
        <Text style={styles.goalText}>Objetivo: {objetivoSaludables} alimentos saludables</Text>
      </View>

      {/* Área de alimentos en formato de botones grandes estilo caricatura */}
      <View style={styles.grid}>
        {ALIMENTOS.map((alimento) => {
          const yaTocado = tocados.includes(alimento.id);

          return (
            <TouchableOpacity
              key={alimento.id}
              activeOpacity={0.9}
              onPress={() => manejarToqueAlimento(alimento)}
              disabled={yaTocado}
              style={[
                styles.foodButton,
                alimento.saludable ? styles.healthyButton : styles.sweetButton,
                yaTocado && styles.usedButton,
              ]}
            >
              <Text style={styles.foodText}>{alimento.nombre}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Mensaje de ayuda/feedback para reforzar aprendizaje */}
      <View style={styles.feedbackCard}>
        <Text style={styles.feedbackText}>{mensaje}</Text>
      </View>

      {/* Botón para iniciar otra ronda */}
      <TouchableOpacity style={styles.resetButton} activeOpacity={0.9} onPress={reiniciarJuego}>
        <Text style={styles.resetText}>Jugar otra vez</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#616161',
    fontWeight: '700',
  },
  scoreCard: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#15415E',
  },
  scoreValue: {
    fontSize: 46,
    fontWeight: '900',
    color: '#0F354C',
    marginVertical: 4,
  },
  goalText: {
    fontSize: 14,
    color: '#1F4D6B',
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 12,
  },
  foodButton: {
    width: '48%',
    minHeight: 70,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  healthyButton: {
    backgroundColor: Colors.secondary,
  },
  sweetButton: {
    backgroundColor: Colors.reward,
  },
  usedButton: {
    opacity: 0.5,
  },
  foodText: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
  },
  feedbackCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    minHeight: 66,
    justifyContent: 'center',
  },
  feedbackText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#555555',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: Colors.accent,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  resetText: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.text,
  },
});

export default MinijuegoScreen;
