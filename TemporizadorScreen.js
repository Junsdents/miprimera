import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from './colors';

// Duración total del cepillado: 3 minutos = 180 segundos.
const DURACION_TOTAL = 180;

// Zonas sugeridas para guiar el cepillado por bloques de 30 segundos.
const ZONAS_CEPILLADO = ['Arriba', 'Abajo', 'Izquierda', 'Derecha', 'Lengua'];

const TemporizadorScreen = () => {
  // Estado principal del tiempo restante.
  const [segundosRestantes, setSegundosRestantes] = useState(DURACION_TOTAL);

  // Controla si el temporizador está corriendo o en pausa.
  const [enMarcha, setEnMarcha] = useState(false);

  // Indica si la rutina terminó para mostrar felicitación.
  const [finalizado, setFinalizado] = useState(false);

  // Valor animado para la barra de progreso (0 a 1).
  const progresoAnimado = useRef(new Animated.Value(0)).current;

  // Convierte segundos a formato MM:SS para una lectura grande y clara.
  const tiempoFormateado = useMemo(() => {
    const minutos = Math.floor(segundosRestantes / 60)
      .toString()
      .padStart(2, '0');
    const segundos = (segundosRestantes % 60).toString().padStart(2, '0');
    return `${minutos}:${segundos}`;
  }, [segundosRestantes]);

  // Calcula el porcentaje actual para la barra de progreso.
  const progreso = useMemo(
    () => (DURACION_TOTAL - segundosRestantes) / DURACION_TOTAL,
    [segundosRestantes],
  );

  // Determina la zona actual en bloques de 30 segundos.
  // Nota: en 180 segundos hay 6 bloques, y tenemos 5 zonas; la última se mantiene en "Lengua".
  const zonaActual = useMemo(() => {
    const bloquesCompletados = Math.floor((DURACION_TOTAL - segundosRestantes) / 30);
    const indiceZona = Math.min(bloquesCompletados, ZONAS_CEPILLADO.length - 1);
    return ZONAS_CEPILLADO[indiceZona];
  }, [segundosRestantes]);

  // Maneja el intervalo de la cuenta regresiva cada segundo.
  useEffect(() => {
    if (!enMarcha || finalizado) return undefined;

    const intervalo = setInterval(() => {
      setSegundosRestantes((valorAnterior) => {
        if (valorAnterior <= 1) {
          clearInterval(intervalo);
          setEnMarcha(false);
          setFinalizado(true);
          return 0;
        }
        return valorAnterior - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [enMarcha, finalizado]);

  // Anima suavemente la barra cada vez que cambia el progreso real.
  useEffect(() => {
    Animated.timing(progresoAnimado, {
      toValue: progreso,
      duration: 350,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [progreso, progresoAnimado]);

  // Alterna entre iniciar y pausar el temporizador.
  const alternarTemporizador = () => {
    if (finalizado) {
      // Si ya terminó, reinicia todo para volver a empezar.
      setSegundosRestantes(DURACION_TOTAL);
      setFinalizado(false);
      setEnMarcha(true);
      return;
    }

    setEnMarcha((valor) => !valor);
  };

  // Interpolación del ancho de la barra para convertir 0..1 en porcentaje visual.
  const anchoBarra = progresoAnimado.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Tarjeta de encabezado con mensaje infantil y zona actual */}
      <View style={styles.encabezado}>
        <Text style={styles.titulo}>¡Vamos a dejar tu sonrisa brillante! ✨</Text>
        <Text style={styles.subtitulo}>Zona actual: {zonaActual}</Text>
      </View>

      {/* Cuenta regresiva grande para que sea fácil de seguir por niños */}
      <View style={styles.tarjetaTiempo}>
        <Text style={styles.etiquetaTiempo}>Tiempo restante</Text>
        <Text style={styles.tiempoGrande}>{tiempoFormateado}</Text>
      </View>

      {/* Barra de progreso animada del cepillado */}
      <View style={styles.tarjetaProgreso}>
        <Text style={styles.etiquetaProgreso}>Progreso</Text>
        <View style={styles.pistaBarra}>
          <Animated.View style={[styles.rellenoBarra, { width: anchoBarra }]} />
        </View>
        <Text style={styles.porcentaje}>{Math.round(progreso * 100)}%</Text>
      </View>

      {/* Botón grande para iniciar o pausar la rutina */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.botonPrincipal, enMarcha ? styles.botonPausa : styles.botonIniciar]}
        onPress={alternarTemporizador}
      >
        <Text style={styles.textoBotonPrincipal}>
          {finalizado ? 'Volver a empezar' : enMarcha ? 'Pausar' : 'Iniciar'}
        </Text>
      </TouchableOpacity>

      {/* Mensaje de felicitación cuando el temporizador llega a cero */}
      {finalizado && (
        <View style={styles.tarjetaFelicitacion}>
          <Text style={styles.tituloFelicitacion}>🎉 ¡Excelente trabajo!</Text>
          <Text style={styles.textoFelicitacion}>Completaste tus 3 minutos de cepillado.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  encabezado: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4C4C4C',
  },
  tarjetaTiempo: {
    backgroundColor: Colors.primary,
    borderRadius: 28,
    paddingVertical: 22,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  etiquetaTiempo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#15425E',
    marginBottom: 8,
  },
  tiempoGrande: {
    fontSize: 56,
    fontWeight: '900',
    color: '#0E3850',
  },
  tarjetaProgreso: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    marginBottom: 18,
  },
  etiquetaProgreso: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 10,
  },
  pistaBarra: {
    width: '100%',
    height: 18,
    backgroundColor: '#E7EEF5',
    borderRadius: 999,
    overflow: 'hidden',
  },
  rellenoBarra: {
    height: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: 999,
  },
  porcentaje: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '700',
    color: '#4B4B4B',
    alignSelf: 'flex-end',
  },
  botonPrincipal: {
    borderRadius: 26,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  botonIniciar: {
    backgroundColor: Colors.accent,
  },
  botonPausa: {
    backgroundColor: Colors.reward,
  },
  textoBotonPrincipal: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.text,
  },
  tarjetaFelicitacion: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  tituloFelicitacion: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: 6,
  },
  textoFelicitacion: {
    fontSize: 16,
    color: '#555555',
    fontWeight: '600',
  },
});

export default TemporizadorScreen;
